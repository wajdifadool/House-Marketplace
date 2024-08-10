import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibiltyIcon from '../assets/svg/visibilityIcon.svg'

import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'

// FireBase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { db } from '../firebase.config'
import Oauth from '../components/Oauth'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
  })
  const { userName, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    // update the form Data
    setFormData((prevState) => ({
      ...prevState,
      // [e.target.id]  this is trick to update the email
      // or  the password based on the id
      // insted of email:e.target.value , name:e.target.value
      [e.target.id]: e.target.value,
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: userName,
      })

      // save the user to the User Collection
      // {...formData}  spread acrooss
      const formDataCopy = { ...formData }
      // TODO: hash the password and save it in the database?
      // reasons : user cant create new password like an old passowrd !
      // JWT? mabey ?
      // .. mean while deelete the password
      // TODO: add loading gstate to blcok the UI
      delete formDataCopy.password
      formDataCopy.timeStap = serverTimestamp() // createing data
      console.log(formDataCopy)

      //  TODO: move To ActionProvider and Cutsome Hooks

      console.log('user')
      console.log(user)

      // Save the USer to the database
      console.log('adding to data base ')
      const docRef = await setDoc(doc(db, 'users', user.uid), formDataCopy)
      console.log(docRef)

      // got the user navigate to home page
      navigate('/')
      toast.success('Successfully SignedUp')

      // Show Toast here
      //
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      // console.log(errorCode, errorMessage)
      toast.error('Something went worng with regestration!')
    }
  }

  return (
    <div>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up</p>
        </header>

        <main>
          <form className="" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              id="userName"
              className="nameInput"
              onChange={onChange}
              value={userName}
            />

            <input
              type="email"
              placeholder="Email"
              id="email"
              className="emailInput"
              onChange={onChange}
              value={email}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                //
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />

              <img
                onClick={() => {
                  setShowPassword((prevState) => !prevState)
                }}
                className="showPassword"
                src={visibiltyIcon}
                alt="show password"
              />
            </div>

            <Link
              //
              className="forgotPasswordLink"
              to="/forget-password">
              Forget Password ?
            </Link>

            <div className="signUpBar">
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google Oauth Component */}
          <Oauth />
          <Link to="/sign-in" className="registerLink">
            Sign In Instened
          </Link>
        </main>
      </div>

      <p
        style={{
          height: '10vh',
        }}></p>
    </div>
  )
}

export default SignUp
/**
 * 
 * The Link component you would use in place of an <a> tag when you want a link 
 * from one page to another within your app. S
 * o the user would need to click on a link and the choice in navigating to that 
 * page would be with the user.
 * 
    The Navigate component you would return from another component when you want
     to forcibly navigate the user without their interaction, like on a redirect 
     for example. So there would be no choice from the user.

The useNaviate hook exposes the same API as the Navigate component and so would
have similar use cases.

Hope that answers it for you.


Wow! That makes so much sense. So, if I understand correctly, the Link component basically replaces the <a> and needs user interaction, while the useNavigate hook redirects a user automatically after they perform some action (like signing in/up)?

 * 
 */
