import React from 'react'
import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
//   useSearchParams is use to get the route query String

function Contact() {
  const [message, setMessage] = useState('')
  const [landLord, setLandLord] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        setLandLord(docSnapshot.data())
        console.log(landLord)
      } else {
        toast.error('Could not get landloard data')
      }
    }

    getLandLord()
  }, [params.landlordId])

  const onChange = (e) => setMessage(e.target.value)

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact LandLord</p>
      </header>

      {landLord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landLord?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}></textarea>
            </div>

            <a
              href={`mailto:${landLord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}>
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
