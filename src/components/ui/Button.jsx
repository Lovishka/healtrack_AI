export default function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition ${className}`}
    >
      {children}
    </button>
  )
}
