import React from 'react';
import {ReactComponent as Logo} from '../../assets/Frame 249.svg';
import './header.scss';
import { Link } from 'react-scroll';
import { Link as Links } from 'react-router-dom';

const Header = () => {
    
    return(
    <div>
        <header>
            <Logo/>
            <div className='links'>
               <Link 
               to="features" smooth={true} offset={-48} duration={500}
               className='link1 lnk'>Features</Link> 
               <Link 
               to="howItWorks" smooth={true} offset={-48} duration={500}
               className='link2 lnk'>How it Works</Link> 
            </div>
            <Links to='/signup' className='get'>Get Started</Links>
        </header>
    </div>
    )
}

export default Header;