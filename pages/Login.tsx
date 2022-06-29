import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { auth } from "../lib/firebase"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/List")
    })
  }, [])

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      router.push("/List")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="bg-gray-200 w-screen h-screen flex">
      <div className="bg-white w-1/6 py-5 m-auto shadow-md">
        <form onSubmit={login} method="POST">
          <div className="w-2/3 m-auto ">
            <p className="font-bold text-3xl text-center text-blue-500">Sign in</p>
            <label className="block">
              <span className="w-1/3 block text-slate-700 text-left">Email</span>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full mt-1 px-2 py-1 shadow-sm rounded-md placeholder-slate-400 text-slate-700 border focus:ring-1 focus:border-sky-500 focus:ring-sky-500 focus:outline-none"
              />
            </label>
            <label className="block pt-2">
              <span className="w-1/3 block text-slate-700 text-left">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full mt-1 px-2 py-1 shadow-sm rounded-md placeholder-slate-400 text-slate-700 border focus:ring-1 focus:border-sky-500 focus:ring-sky-500 focus:outline-none"
              />
            </label>
            <button type="submit" className="w-full rounded bg-blue-500 hover:bg-blue-600 p-1 text-m text-white mt-4">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

