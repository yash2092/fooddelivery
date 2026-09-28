function Button({ text, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 active:bg-orange-700 shadow-md shadow-orange-500/20 ${className}`}
    >
      {text}
    </button>
  )
}

export default Button