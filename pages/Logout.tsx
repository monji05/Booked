import { useEffect, FC, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'

const Logout: FC = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<null | object>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        router.push("/List")
      } else {
        setCurrentUser(null)
        router.push("/Login")
      }
    })
  }, [])

  const logOut = async () => {
    try {
      await auth.signOut()
      router.push('/Login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="w-1/12">
      <button onClick={logOut} className="rounded font-bold px-2 py-1 text-slate-800 text-lg hover:text-white hover:bg-red-400">Logout</button>
    </div>
  )
}

export default Logout

