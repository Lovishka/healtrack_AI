import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, onSnapshot, setDoc, updateDoc, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Utility to generate a UUID for unique IDs
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// --- Custom Hook for Firebase Initialization and Authentication ---
function useAuth() {
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [firestoreDb, setFirestoreDb] = useState(null);
  const [firebaseAuth, setFirebaseAuth] = useState(null);

  useEffect(() => {
    // These are global variables provided by the environment
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
    let firebaseConfig = null;
    try {
      firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
    } catch (e) {
      console.error('Failed to parse Firebase config:', e);
      setIsAuthReady(false);
      return;
    }

    if (!firebaseConfig || !firebaseConfig.projectId) {
      console.error('Firebase config is missing projectId.');
      setIsAuthReady(false);
      return;
    }

    // Initialize Firebase services
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    setFirebaseApp(app);
    setFirestoreDb(db);
    setFirebaseAuth(auth);

    // Sign in the user
    const signIn = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error('Firebase Auth Error:', error);
      }
      setIsAuthReady(true);
    };
    
    signIn();

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userId, isAuthReady, firebaseApp, firestoreDb, firebaseAuth };
}

// --- Main Hospital Dashboard Component ---
const App = () => {
  const { userId, isAuthReady, firestoreDb: db, firebaseAuth: auth } = useAuth();
  const [beds, setBeds] = useState([]);
  const [queue, setQueue] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);

  // Firestore Collection References (check if db is ready)
  const [bedsCollectionRef, setBedsCollectionRef] = useState(null);
  const [queueCollectionRef, setQueueCollectionRef] = useState(null);
  const [patientCountDocRef, setPatientCountDocRef] = useState(null);

  // Initialize Firestore references once `db` is available
  useEffect(() => {
    if (db) {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      setBedsCollectionRef(collection(db, 'artifacts', appId, 'public', 'data', 'beds'));
      setQueueCollectionRef(collection(db, 'artifacts', appId, 'public', 'data', 'queue'));
      setPatientCountDocRef(doc(db, 'artifacts', appId, 'public', 'data', 'summary', 'patientCount'));
    }
  }, [db]);

  // Real-time listener for bed data
  useEffect(() => {
    if (!isAuthReady || !bedsCollectionRef) return;

    const unsubscribe = onSnapshot(bedsCollectionRef, (snapshot) => {
      const bedList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBeds(bedList);
    });

    return () => unsubscribe();
  }, [isAuthReady, bedsCollectionRef]);

  // Real-time listener for queue data
  useEffect(() => {
    if (!isAuthReady || !queueCollectionRef) return;

    const unsubscribe = onSnapshot(queueCollectionRef, (snapshot) => {
      const queueList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueue(queueList);
    });

    return () => unsubscribe();
  }, [isAuthReady, queueCollectionRef]);

  // Real-time listener for total patient count
  useEffect(() => {
    if (!isAuthReady || !patientCountDocRef) return;

    const unsubscribe = onSnapshot(patientCountDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setPatientCount(docSnap.data().totalVisited || 0);
      }
    });

    return () => unsubscribe();
  }, [isAuthReady, patientCountDocRef]);

  // Function to initialize beds in Firestore
  const initializeBeds = async () => {
    if (!userId || !bedsCollectionRef) return;
    const initialBeds = 10;
    for (let i = 1; i <= initialBeds; i++) {
      const bedRef = doc(bedsCollectionRef, `bed${i}`);
      await setDoc(bedRef, {
        bedId: `bed${i}`,
        status: 'available',
        patientName: null,
        updatedAt: serverTimestamp(),
      });
    }
  };

  // Function to add a patient to the queue
  const addPatientToQueue = async () => {
    if (!userId || !queueCollectionRef) {
      setStatusMessage('App is not ready. Please wait.');
      return;
    }
    const newPatientName = `Patient-${Math.floor(Math.random() * 1000)}`;
    try {
      await addDoc(queueCollectionRef, {
        patientName: newPatientName,
        status: 'in_queue',
        createdAt: serverTimestamp(),
      });
      setStatusMessage(`Patient ${newPatientName} added to queue!`);
    } catch (e) {
      console.error("Error adding patient: ", e);
      setStatusMessage('Failed to add patient.');
    }
    console.log(`Added patient ${newPatientName} to the queue.`);
  };

  // Function to book a bed for a patient from the queue
  const bookBed = async (bedId) => {
    if (!userId || queue.length === 0 || !bedsCollectionRef) return;
    const patientToBook = queue[0];
    await updateDoc(doc(bedsCollectionRef, bedId), {
      status: 'occupied',
      patientName: patientToBook.patientName,
      updatedAt: serverTimestamp(),
    });
    // Remove patient from queue
    await doc(queueCollectionRef, patientToBook.id).delete();
    // Increment patient visited count
    await setDoc(patientCountDocRef, { totalVisited: patientCount + 1 }, { merge: true });
    console.log(`Booked bed ${bedId} for ${patientToBook.patientName}.`);
  };

  // Function to discharge a patient, making the bed available
  const dischargePatient = async (bedId) => {
    if (!userId || !bedsCollectionRef) return;
    await updateDoc(doc(bedsCollectionRef, bedId), {
      status: 'available',
      patientName: null,
      updatedAt: serverTimestamp(),
    });
    console.log(`Discharged patient from bed ${bedId}.`);
  };

  // Handle initialization on first load
  useEffect(() => {
    if (!isAuthReady || !bedsCollectionRef) return;

    const checkAndInit = async () => {
      const docs = await getDocs(bedsCollectionRef);
      if (docs.empty) {
        console.log('No beds found, initializing...');
        await initializeBeds();
      }
    };
    checkAndInit();
  }, [isAuthReady, bedsCollectionRef]);

  // Pre-calculate counts for the dashboard cards
  const occupiedBeds = beds.filter(bed => bed.status === 'occupied').length;
  const availableBeds = beds.filter(bed => bed.status === 'available').length;
  const patientsInQueue = queue.length;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">Hospital Bed Dashboard</h1>
      <p className="text-center text-gray-500 mb-8">User ID: {userId}</p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={addPatientToQueue}
          disabled={!isAuthReady}
          className="bg-purple-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Patient to Queue
        </button>
      </div>

      {statusMessage && (
        <div className="text-center text-sm font-semibold text-gray-600 mb-4">{statusMessage}</div>
      )}

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-5xl font-bold text-blue-600">{availableBeds}</h2>
          <p className="text-lg text-gray-500 mt-2">Available Beds</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-5xl font-bold text-red-600">{occupiedBeds}</h2>
          <p className="text-lg text-gray-500 mt-2">Occupied Beds</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-5xl font-bold text-orange-500">{patientsInQueue}</h2>
          <p className="text-lg text-gray-500 mt-2">Beds in Queue</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-5xl font-bold text-green-600">{patientCount}</h2>
          <p className="text-lg text-gray-500 mt-2">Patients Visited</p>
        </div>
      </div>
      
      {/* Bed and Queue Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Queue List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Patient Queue</h2>
          <ul className="space-y-3">
            {queue.map(patient => (
              <li key={patient.id} className="bg-gray-50 p-4 rounded-xl shadow-sm flex justify-between items-center">
                <span className="font-medium text-gray-800">{patient.patientName}</span>
                <span className="text-sm text-gray-500">In Queue</span>
              </li>
            ))}
            {queue.length === 0 && (
              <li className="text-center text-gray-500 italic">No patients in queue.</li>
            )}
          </ul>
        </div>
        
        {/* Bed Status List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Bed Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beds
              .sort((a, b) => a.bedId.localeCompare(b.bedId))
              .map(bed => (
                <div
                  key={bed.id}
                  className={`p-4 rounded-xl shadow-md transition-all duration-300
                    ${bed.status === 'available' ? 'bg-blue-100 border-blue-300' :
                      bed.status === 'occupied' ? 'bg-red-100 border-red-300' :
                      'bg-gray-100 border-gray-300'
                    } border-2`}
                >
                  <p className="font-bold text-lg">{bed.bedId.toUpperCase()}</p>
                  <p className={`font-semibold mt-1 capitalize
                    ${bed.status === 'available' ? 'text-blue-600' :
                      bed.status === 'occupied' ? 'text-red-600' :
                      'text-gray-600'
                    }`}
                  >
                    Status: {bed.status}
                  </p>
                  {bed.patientName && (
                    <p className="text-sm text-gray-700 mt-1">Patient: {bed.patientName}</p>
                  )}
                  <div className="mt-4 flex gap-2">
                    {bed.status === 'available' && queue.length > 0 && (
                      <button
                        onClick={() => bookBed(bed.id)}
                        className="flex-1 bg-green-500 text-white text-sm py-2 rounded-full hover:bg-green-600 transition duration-300"
                      >
                        Book Bed
                      </button>
                    )}
                    {bed.status === 'occupied' && (
                      <button
                        onClick={() => dischargePatient(bed.id)}
                        className="flex-1 bg-gray-500 text-white text-sm py-2 rounded-full hover:bg-gray-600 transition duration-300"
                      >
                        Discharge
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
