import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibiltyIcon from '../assets/svg/visibilityIcon.svg'
import Oauth from '../components/Oauth'
// import firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

//Toast

import { toast } from 'react-toastify'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

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
    const auth = getAuth()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      if (user) {
        // TODO handle UI FeedBack(Toastasfiy )
        toast.success('Successfully Logedin')
        navigate('/') // redirect to explore page
      }
    } catch (error) {
      toast.error('bad user credentials')
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error)
    }
  }
  return (
    <div>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcom Back</p>
          <p className="pageHeader">Sign in </p>
        </header>

        <main>
          <form className="" onSubmit={onSubmit}>
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

            <div className="signInBar">
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google Oauth Component */}
          <Oauth />
          <Link to="/sign-up" className="registerLink">
            Sign Up Instened
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

export default SignIn
