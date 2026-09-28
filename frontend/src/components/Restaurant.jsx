function Restaurant({
  name,
  image,
  rating,
  distance,
  deliveryTime,
  offer,
  cuisine,
}) {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 text-left shadow-md transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-xl">
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
        {offer && (
          <span className="absolute bottom-2 left-2 rounded-lg bg-orange-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            {offer}
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-semibold text-white">
            {name}
          </h3>
          <span className="shrink-0 rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
            ★ {rating}
          </span>
        </div>

        {cuisine && (
          <p className="mt-1 truncate text-xs text-zinc-400">{cuisine}</p>
        )}

        <p className="mt-1 text-xs text-zinc-400">
          {distance} • {deliveryTime}
        </p>
      </div>
    </div>
  )
}

export default Restaurant
