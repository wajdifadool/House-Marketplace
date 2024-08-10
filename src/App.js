import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import Profile from './pages/Profile'
import Explore from './pages/Explore'
import ForgetPassword from './pages/ForgetPassword'
import Offers from './pages/Offers'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Category from './pages/Category'
import PrivateRoute from './components/PirvateRoute'
import Listing from './pages/Listing'
import CreateListing from './pages/CreateListing'
import Contact from './pages/Contact'
import EditListing from './pages/EditListing'
//Toast Alerts
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
        </Routes>

        {/* Nav bar */}
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
