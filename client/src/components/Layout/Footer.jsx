import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='footer'>
      <div></div> {/* Empty div to push the text to center */}
      <h4 className='mb-0 text-center' style={{ flex: 1 }}>&copy; 2024 ShopEase. All rights reserved.</h4>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>
        <span className='footer-divider'>|</span>
        <Link to='/contact'>Contact</Link>
        <span className='footer-divider'>|</span>
        <Link to='/policy'>Privacy Policy</Link>
        <span className='footer-divider'>|</span>
        <Link to='https://www.github.com/sanitjindal' className='text-light mx-2'>
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </Link>
        <span className='footer-divider'>|</span>
        <Link to='https://www.linkedin.com/in/sanitjindal' className='text-light mx-2'>
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </Link>
      </p>
    </div>
  );
}

export default Footer;
