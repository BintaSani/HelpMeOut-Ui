import React from 'react';
import './main.scss';
import DotGrid from '../dotGrid/dotGrid';

const Main = () => {
    return(
        <div className='main'>
            <section className='show'>
                <div className='container'>
                    <h1 className='animate'>Show Them Don’t Just Tell</h1>
                    <p className='animate'>Help your friends and loved ones by creating and sending videos on how to get things done on a website.</p>
                    <button className='animate'>Install HelpMeOut <span className='arrow'>&#8594;</span></button>
                </div>
            </section>
            <section className='pic'>
                <DotGrid className='grid1' color='#100A4230' pos='absolute' left='73.5%' top='20vh' />
                <DotGrid className='grid2' color='#BAF6EB50' pos='absolute'bottom='9.6vh' left='43%'/>
                <div className='images'>
                    <img src='https://i.ibb.co/R9PGVCh/Frame-1000002595.png' alt='image1' className='image1  imgs'/>
                    <img src='https://i.ibb.co/TL0HrKV/Frame-1000002596.png' alt='image2' className='image2 imgs'/>
                    <img src='https://i.ibb.co/mGmwdQP/Frame-1000002597.png' alt='image3' className='image3 imgs'/>
                </div>
            </section>
        </div>
    )
}

export default Main;