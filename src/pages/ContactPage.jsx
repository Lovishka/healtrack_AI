import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const imageUrl = "https://images.unsplash.com/photo-1550503043-461159846b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDk0MzV8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwdXN8ZW58MHx8fHwxNjk5NjAyNzI1fDA&ixlib=rb-4.0.3&q=80&w=1080";

const ContactPage = () => {
    

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        
    };

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed py-12 px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: `url('${imageUrl}')` }}
        >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-10 rounded-2xl shadow-xl space-y-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center lg:text-left">
                        Get in Touch
                    </h2>
                    <p className="mt-2 text-lg text-gray-700 text-center lg:text-left">
                        We are here to help and answer any questions you might have. We look forward to hearing from you.
                    </p>

                    <div className="space-y-6 mt-8">
                        <div className="flex items-center space-x-4">
                            <MapPin className="h-6 w-6 text-green-600" />
                            <p className="text-gray-800">Block A,Galgotias University,Greater Noida</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone className="h-6 w-6 text-green-600" />
                            <p className="text-gray-800">+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Mail className="h-6 w-6 text-green-600" />
                            <p className="text-gray-800">contact@healtrackai.com</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-10 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Send Us a Message
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Fill out the form below and we will get back to you.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;