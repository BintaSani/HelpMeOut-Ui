import React from 'react';
import Header from '../../component/header/header';
import Main from '../../component/main/main';
import Features from '../../component/features/features';
import HowItWorks from '../../component/howitWorks/howitWorks';
import Footer from '../../component/footer/footer';
import './homepage.scss';
import { Element } from 'react-scroll';


const Homepage = () => {
    return(
        <div className='homepage'>
            <Header/>
            <Main/>
            <div className='separate'></div>
            <Element name='features'>
                <Features/>
            </Element>
            <div className='separate'></div>
            <Element name='howItWorks'>
                <HowItWorks/>
            </Element>
            <Footer/>
        </div>
    )
}

export default Homepage;