import React from 'react';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div>
    <h1 className='header'> Rappor</h1>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          href="#profile"
          onClick={() => handlePageChange('Profile')}
          // Check to see if the currentPage is `profile`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
        >
          Profile
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#feed"
          onClick={() => handlePageChange('Feed')}
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Feed' ? 'nav-link active' : 'nav-link'}
        >
          Feed
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#messages"
          onClick={() => handlePageChange('Messages')}
          // Check to see if the currentPage is `messages`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Messages' ? 'nav-link active' : 'nav-link'}
        >
          Messages
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#login/signup"
          onClick={() => handlePageChange('login/signup')}
          // Check to see if the currentPage is `login/signup`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'login/signup' ? 'nav-link active' : 'nav-link'}
        >
          login/signup
        </a>
      </li>
    </ul>
    </div>
  );
}

export default NavTabs;