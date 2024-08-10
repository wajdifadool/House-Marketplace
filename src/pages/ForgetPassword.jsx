import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
function ForgetPassword() {
  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const OnSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      // TODO: Add spinner
      toast.success('Reset Link has been sent ... ')
    } catch (error) {
      // console.log(erro)
      toast.error('could not send Reset Email !')
    }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader"></p>
      </header>
      <main>
        <form onSubmit={OnSubmit}>
          <input
            type="email"
            id="email"
            placeholder="email"
            className="emailInput"
            onChange={onChange}
          />

          <Link className="forgetPasswordLink" to="/sign-in">
            SIgn in
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon
                fill="#fff"
                width="34px"
                height="34px"></ArrowRightIcon>
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgetPassword
