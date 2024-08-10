import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// FireBase
import { getAuth, updateProfile } from 'firebase/auth'
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'

import { db } from '../firebase.config'

import arrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'
import { toast } from 'react-toastify'
function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)

  // const [user, setUser] = useState(null)
  const [formdata, setFormaData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formdata
  const [userListing, setUserListing] = useState([]) // updated in the useEffect
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    // show the listing for the current user
    // TODO: move to Local SERVICES  LAYER  (MVC)
    const fetchUserListing = async () => {
      // do the fetch
      try {
        // the Current User id from localIndexDB
        const userId = auth.currentUser.uid

        // Refrence for the collection
        const listingsRef = collection(db, 'listings')

        // Build the query
        // const q = query(
        //   listingRef,
        //   // it will select a all coucumnets where userRef = `Current UID`
        //   where('userRef', '==', userId),
        //   orderBy('timestamp', 'desc'),
        //   limit(10)
        // );

        const q = query(
          listingsRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        )

        // Execute the Query
        const querySnapShot = await getDocs(q)

        console.log(querySnapShot)
        const mListing = [] //
        querySnapShot.forEach((doc) => {
          return mListing.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        // update data state
        setUserListing(mListing)
        console.log('fetched UserListing', mListing)
        //  updated state , the JSX element will be reacted to
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserListing()
  }, [auth.currentUser.uid])

  const onLogOut = () => {
    auth.signOut()
    navigate('/')
  }

  // submit updating personla user data
  const onSubmit = async () => {
    // done have been Clicked
    try {
      if (auth.currentUser.userName !== name) {
        // updated user profilelocale in  the INddexDB

        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // pdate in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          // name , the same
          name: name,
        })
      }
    } catch (error) {
      // console.log(error)
      toast.error('Could notupdate profile details')
    }
  }

  // this will update the user data when input get changed // this is for the user
  // personal Data
  const onChange = (e) => {
    setFormaData((prevState) => ({
      ...prevState, // passing the prev state as an object and update to it
      [e.target.id]: e.target.value,
    }))
  }

  // update. edit listing

  // this will update the user data when input get changed

  const onDelete = async (listingID) => {
    // make acoonfirm
    if (window.confirm('are you sure to delete')) {
      await deleteDoc(doc(db, 'listings', listingID))

      // ok now filter and update the ui
      const updatedListings = userListing.filter(
        (listing) => listing.id !== listingID
      )

      setUserListing(updatedListings)
      toast.success('listing has been deleted!')
    }
  }

  const onEdit = (listingId) => {
    // this function just navigate to the edit page
    navigate(`/edit-listing/${listingId}`)
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader"> My Profile</p>
        <button onClick={onLogOut} type="button" className="logOut">
          Log out
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            onClick={() => {
              // if change details is true , then we submit// otherwise it wont be called
              changeDetails && onSubmit()
              // if change deatils is flase , then set it to true so we can update user data
              // the changeDetails will make sure the input is disabled

              setChangeDetails(!changeDetails)
            }}
            className="changePersonalDetails">
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        {/* Profie name And Email */}
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name" // if id !== formadata params , setFormData will not work as it should to
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        {/* Create the Add Listing Here  */}
        {/* //TODO: move to offer Page */}
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent Home</p>
          <img src={arrowRightIcon} alt="arrowRightIcon" />
        </Link>

        {/* the Listings */}
        <p className="pageHeader">My Listings :</p>

        <ul className="categoryListings">
          {userListing.map((item) => (
            // <ListingItem listing={item} id={}/>
            // <h3 key={listing.id}>{item.data.name}</h3>
            <ListingItem
              key={item.id}
              listing={item.data}
              id={item.id}
              onDelete={() => onDelete(item.id)}
              onEdit={() => onEdit(item.id)}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Profile
