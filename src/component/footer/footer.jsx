import React from 'react';
import { ReactComponent as Logo} from '../../assets/Frame.svg';
import './footer.scss';


const Footer = () => {
    return(
        <div className='footer'>
            <footer>
                <div className='logo-white'>
                    <Logo/>
                </div>
                <div className='menu f1'>
                    <h5>Menu</h5>
                    <p>Home</p>
                    <p>Converter</p>
                    <p className='last'>How it Works</p>
                </div>
                <div className='about f1'>
                    <h5>About us</h5>
                    <p>About</p>
                    <p>Contact Us</p>
                    <p className='last'>Privacy Policy</p>
                </div>
                <div className='screen-rec f1'>
                    <h5>Screen Record</h5>
                    <p>Browser Window</p>
                    <p>Desktop</p>
                    <p className='last'>Application</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;