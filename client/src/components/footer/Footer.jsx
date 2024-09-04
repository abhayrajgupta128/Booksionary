import React from 'react'
import { images } from '../../constants';
import './footer.css';

const Footer = () => {
  return (
    <div>
        <div className="books__footer section__padding">
            <div className="books__footer-heading">
            <h1 className="gradient__text">Find What You Need & Stay Connected </h1>
            </div>

            <div className="books__footer-btn">
                <p><a href="#">Go back to top</a></p>
            </div>

            <div className="books__footer-links">
            <div className="books__footer-links_logo">
                <img src={images.logo} alt="books_logo" />
                <p>Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved</p>
            </div>
            <div className="books__footer-links_div">
                <h4>Links</h4>
                <p>Overons</p>
                <p>Social Media</p>
                <p>Counters</p>
                <p>Contact</p>
            </div>
            <div className="books__footer-links_div">
                <h4>Company</h4>
                <p>Terms & Conditions </p>
                <p>Privacy Policy</p>
                <p>Contact</p>
            </div>
            <div className="books__footer-links_div">
                <h4>Get in touch</h4>
                <p>Crechterwoord K12 182 DK Alknjkcb</p>
                <p>085-132567</p>
                <p>info@payme.net</p>
            </div>
            </div>

            <div className="books__footer-copyright">
            <p>@2021 Booktory. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
