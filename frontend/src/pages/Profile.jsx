import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddress } from "../context/AddressContext"

const API = "http://localhost:8080/api/auth"
const inputClass =
  "mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-base text-white placeholder-zinc-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"

function Profile() {
  const navigate = useNavigate()
  const { load, selected } = useAddress()
  const [mobile, setMobile] = useState("")
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [exists, setExists] = useState(null)
  const [otpOk, setOtpOk] = useState(false)
  const [message, setMessage] = useState("")
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  const lastSent = useRef("")
  const lastCheckedCode = useRef("")
  const isValidMobile = mobile.length === 10 && /^[0-9]+$/.test(mobile)

  useEffect(() => {
    if (!isValidMobile) {
      lastSent.current = ""
      lastCheckedCode.current = ""
      setCode("")
      setExists(null)
      setOtpOk(false)
      setName("")
      setEmail("")
      return
    }
    if (lastSent.current === mobile) {
      return
    }
    lastSent.current = mobile

    fetch(`${API}/check-mobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    })
      .then((res) => res.json())
      .then((data) => setExists(data.exists === "true"))
      .catch(() => setMessage("Backend not running"))

    fetch(`${API}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Could not send OTP"))
  }, [isValidMobile, mobile])

  useEffect(() => {
    if (!isValidMobile || code.length !== 4 || lastCheckedCode.current === code) {
      return
    }
    lastCheckedCode.current = code

    fetch(`${API}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, code }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
        if (data.exists === "true" && data.id) {
          const nextUser = data
          localStorage.setItem("user", JSON.stringify(nextUser))
          setUser(nextUser)
          window.dispatchEvent(new Event("auth-changed"))
          load()
          return
        }
        if (data.exists === "false") {
          setOtpOk(true)
        } else {
          lastCheckedCode.current = ""
        }
      })
      .catch(() => setMessage("Could not verify OTP"))
  }, [code, isValidMobile, mobile])

  const createAccount = () => {
    fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, name, email, code }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
        if (data.id) {
          const nextUser = data
          localStorage.setItem("user", JSON.stringify(nextUser))
          setUser(nextUser)
          window.dispatchEvent(new Event("auth-changed"))
          load()
        }
      })
      .catch(() => setMessage("Could not create account"))
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.dispatchEvent(new Event("auth-changed"))
    setMobile("")
    setCode("")
    setOtpOk(false)
    setExists(null)
    setMessage("")
  }

  if (user) {
    return (
      <div className="px-4 pb-24 pt-6 bg-zinc-950 text-white min-h-screen">
        <h1 className="text-2xl font-bold text-white">Account</h1>
        <div className="mt-6 rounded-2xl bg-zinc-900 border border-zinc-800 p-4 shadow-md">
          <p className="text-lg font-bold text-white">{user.name || "Foodie"}</p>
          <p className="mt-1 text-sm text-zinc-400">+91 {user.mobile}</p>
          {user.email && <p className="mt-1 text-sm text-zinc-400">{user.email}</p>}
        </div>
        <button
          type="button"
          onClick={() => navigate("/addresses")}
          className="mt-4 w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 active:bg-orange-700"
        >
          {selected?.label ? `Addresses (${selected.label})` : "Manage addresses"}
        </button>
        <button
          type="button"
          onClick={logout}
          className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3.5 font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 pb-24 pt-6 bg-zinc-950 text-white min-h-screen">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">Login</p>
      <h1 className="mt-1 text-2xl font-bold text-white">Enter your mobile number</h1>
      <p className="mt-2 text-sm text-zinc-400">We’ll send an OTP to verify this number</p>

      <label className="mt-8 block text-sm font-medium text-zinc-300">
        Mobile number
        <div className="mt-1.5 flex overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 focus-within:border-orange-500">
          <span className="flex items-center border-r border-zinc-800 px-3.5 text-sm font-semibold text-zinc-300">
            +91
          </span>
          <input
            name="mobile"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10)
              setMobile(value)
              setMessage("")
            }}
            className="w-full bg-transparent px-3 py-3 text-base text-white placeholder-zinc-500 outline-none"
            placeholder="10-digit number"
            inputMode="numeric"
          />
        </div>
      </label>

      {!isValidMobile && mobile.length > 0 && (
        <p className="mt-2 text-sm text-red-400">Enter a valid 10-digit mobile number</p>
      )}

      {isValidMobile && (
        <label className="mt-5 block text-sm font-medium text-zinc-300">
          Enter OTP
          <input
            name="otp"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, "").slice(0, 4))
              setOtpOk(false)
            }}
            className={inputClass}
            placeholder="4-digit OTP"
            inputMode="numeric"
          />
        </label>
      )}

      {otpOk && exists === false && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-white">Create your account</h2>
          <p className="mt-1 text-sm text-zinc-400">This number is new. Add your details to continue.</p>

          <label className="mt-4 block text-sm font-medium text-zinc-300">
            Name
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-zinc-300">
            Email
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="email@example.com"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-zinc-300">
            Mobile
            <input name="signup-mobile" value={"+91 " + mobile} readOnly className={inputClass} />
          </label>

          <button
            type="button"
            onClick={createAccount}
            className="mt-6 w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 active:bg-orange-700"
          >
            Create account
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-sm text-orange-400 font-medium">{message}</p>}
    </div>
  )
}

export default Profile
