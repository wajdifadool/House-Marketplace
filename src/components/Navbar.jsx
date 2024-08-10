import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/personOutlineIcon.svg'

import { NavLink } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      // we ccan tell waht is the path e are at
      // exxample : /profile  , /offers
      return true
      //
    }
  }
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <NavLink to="/">
              {({ isActive }) => (
                <>
                  <ExploreIcon
                    fill={isActive ? '#2c2c2c' : '#8f8f8f'}
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }>
                    Explore
                  </p>
                </>
              )}

              {/* <ExploreIcon //
                fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
                width="36px"
                height="36px"
              />
              <p
                className={
                  pathMatchRoute('/')
                    ? 'navbarListItemNameActive'
                    : 'navbarListItemName'
                }>
                Explore
              </p> */}
            </NavLink>
          </li>

          <li className="navbarListItem">
            <NavLink to="/offers">
              {({ isActive }) => (
                <>
                  <OfferIcon
                    fill={isActive ? '#2c2c2c' : '#8f8f8f'}
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }>
                    Offers
                  </p>
                </>
              )}
            </NavLink>
            {/* <OfferIcon
              //
              fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathMatchRoute('/offers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }>
              Offer
            </p> */}
          </li>

          <li className="navbarListItem">
            <NavLink to="/profile">
              {({ isActive }) => (
                <>
                  <ProfileIcon
                    fill={isActive ? '#2c2c2c' : '#8f8f8f'}
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }>
                    Profile
                  </p>
                </>
              )}
            </NavLink>
          </li>

          {/* <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <ProfileIcon //
              fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }>
              Profile
            </p>
          </li> */}
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
