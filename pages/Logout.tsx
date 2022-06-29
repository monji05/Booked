import { useEffect, FC, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'

const Logout: FC = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<null | object>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user: User) => {
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
      <button onClick={logOut} className="bg-slate-500 rounded px-2 py-2 text-slate-100 hover:bg-slate-400">Logout</button>
    </div>
  )
}

export default Logout

