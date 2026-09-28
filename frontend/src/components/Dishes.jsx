function Dishes({ name, image }) {
  return (
    <div className="w-24 shrink-0 text-center">
      <img
        src={image}
        alt={name}
        className="h-24 w-24 rounded-full object-cover ring-2 ring-orange-500/80 shadow-md shadow-orange-500/10 transition hover:scale-105"
      />
      <h3 className="mt-2 text-sm font-medium text-white">{name}</h3>
    </div>
  )
}

export default Dishes
