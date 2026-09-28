import { createContext, useContext, useEffect, useState } from "react"

const AddressContext = createContext(null)
const SELECTED_KEY = "selectedAddress"
const GUEST_KEY = "guestAddresses"

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null")
  } catch {
    return null
  }
}

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([])
  const [selected, setSelected] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SELECTED_KEY) || "null")
    } catch {
      return null
    }
  })

  const load = () => {
    const user = readUser()
    if (user?.id) {
      fetch(`http://localhost:8080/api/addresses?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setAddresses(Array.isArray(data) ? data : []))
        .catch(() => setAddresses([]))
      return
    }
    try {
      setAddresses(JSON.parse(localStorage.getItem(GUEST_KEY) || "[]"))
    } catch {
      setAddresses([])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const selectAddress = (address) => {
    setSelected(address)
    localStorage.setItem(SELECTED_KEY, JSON.stringify(address))
  }

  const addAddress = (fields) => {
    const user = readUser()
    if (user?.id) {
      return fetch("http://localhost:8080/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, userId: Number(user.id) }),
      })
        .then((res) => res.json())
        .then((saved) => {
          setAddresses((prev) => [...prev, saved])
          selectAddress(saved)
        })
    }

    const saved = { ...fields, id: Date.now() }
    const next = [...addresses, saved]
    setAddresses(next)
    localStorage.setItem(GUEST_KEY, JSON.stringify(next))
    selectAddress(saved)
    return Promise.resolve()
  }

  const removeAddress = (id) => {
    const user = readUser()
    if (user?.id) {
      fetch(`http://localhost:8080/api/addresses/${id}`, { method: "DELETE" }).catch(
        () => {}
      )
    }
    const next = addresses.filter((item) => String(item.id) !== String(id))
    setAddresses(next)
    if (!user?.id) {
      localStorage.setItem(GUEST_KEY, JSON.stringify(next))
    }
    if (selected && String(selected.id) === String(id)) {
      setSelected(null)
      localStorage.removeItem(SELECTED_KEY)
    }
  }

  return (
    <AddressContext.Provider
      value={{ addresses, selected, selectAddress, addAddress, removeAddress, load }}
    >
      {children}
    </AddressContext.Provider>
  )
}

export function useAddress() {
  const value = useContext(AddressContext)
  if (!value) {
    throw new Error("useAddress must be used inside AddressProvider")
  }
  return value
}
