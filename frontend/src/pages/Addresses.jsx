import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAddress } from "../context/AddressContext"

function Addresses() {
  const { addresses, selected, selectAddress, addAddress, removeAddress, load } =
    useAddress()
  const [label, setLabel] = useState("Home")
  const [line, setLine] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    load()
  }, [])

  const save = () => {
    if (!line.trim() || !city.trim()) {
      setError("Enter street and city")
      return
    }
    setError("")
    addAddress({
      label: label.trim() || "Home",
      line: line.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
    }).then(() => {
      setLine("")
      setCity("")
      setPincode("")
    })
  }

  return (
    <div className="px-4 pb-24 pt-6 bg-zinc-950 text-white min-h-screen">
      <Link to="/" className="text-sm font-semibold text-orange-500 hover:text-orange-400">
        ← Back to Home
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Addresses</h1>
      <p className="mt-1 text-sm text-zinc-400">Choose where we should deliver</p>

      <div className="mt-6 space-y-3">
        {addresses.length === 0 && (
          <p className="text-sm text-zinc-400">No saved addresses yet.</p>
        )}
        {addresses.map((address) => {
          const active = selected && String(selected.id) === String(address.id)
          return (
            <div
              key={address.id}
              className={`rounded-2xl border bg-zinc-900 p-4 shadow-md transition ${
                active ? "border-orange-500 ring-1 ring-orange-500" : "border-zinc-800"
              }`}
            >
              <button
                type="button"
                className="w-full text-left"
                onClick={() => selectAddress(address)}
              >
                <p className="font-bold text-white">{address.label}</p>
                <p className="mt-1 text-sm text-zinc-300">
                  {address.line}, {address.city}
                  {address.pincode ? ` - ${address.pincode}` : ""}
                </p>
                {active && (
                  <p className="mt-2 text-xs font-bold text-orange-400">
                    ✓ Delivering here
                  </p>
                )}
              </button>
              <button
                type="button"
                onClick={() => removeAddress(address.id)}
                className="mt-3 text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>

      <h2 className="mt-8 text-lg font-bold text-white">Add address</h2>
      <label className="mt-3 block text-sm font-medium text-zinc-300">
        Save as
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
        >
          <option value="Home" className="bg-zinc-900 text-white">Home</option>
          <option value="Work" className="bg-zinc-900 text-white">Work</option>
          <option value="Other" className="bg-zinc-900 text-white">Other</option>
        </select>
      </label>
      <label className="mt-3 block text-sm font-medium text-zinc-300">
        Street / area
        <input
          value={line}
          onChange={(e) => setLine(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-orange-500"
          placeholder="House no, street"
        />
      </label>
      <label className="mt-3 block text-sm font-medium text-zinc-300">
        City
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-orange-500"
          placeholder="City"
        />
      </label>
      <label className="mt-3 block text-sm font-medium text-zinc-300">
        Pincode
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-orange-500"
          placeholder="6-digit pincode"
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-400 font-medium">{error}</p>}
      <button
        type="button"
        onClick={save}
        className="mt-6 w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 active:bg-orange-700"
      >
        Save address
      </button>
    </div>
  )
}

export default Addresses
