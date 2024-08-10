import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function Oauth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    // on google icon click
    try {
      const auth = getAuth()

      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      // check if the user already exist in the same email ,
      // if so we can use googeAuth for this user
      // else we can carry on and register/login with the eamil

      if (!docSnap.exists()) {
        // create the user in the DataBase
        await setDoc(doc(db, 'users', user.uid), {
          // the new data
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      toast.success(`welcome ${user.displayName}!`)
      navigate('/')
    } catch (error) {
      console.log('error ouath')
      console.log(error)
      toast.error('cant auth with google .. ')
    }
  }
  return (
    <div className="socailLogin">
      <p>
        Sign
        {location.pathname === '/sign-up' ? 'up' : 'in '} with
      </p>

      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="googleIcon" />
      </button>
    </div>
  )
}

export default Oauth
