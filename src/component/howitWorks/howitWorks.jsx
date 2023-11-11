import React from 'react';
import { ReactComponent as Icon1 } from '../../assets/Icon1.svg';
import { ReactComponent as Icon2 } from '../../assets/Icon2.svg';
import { ReactComponent as Icon3 } from '../../assets/Icon3.svg';
import { ReactComponent as Rec } from '../../assets/rec.svg';
import './howitWorks.scss';


const HowItWorks = () => { 
    return(
        <div className='how-it-works'>
            <h1>How it works</h1>
            <div className='cont1'>
                <div className='how'>
                    <div>
                        <Icon3/>
                    </div>
                    <h4 className='head1'>Record Screen</h4>
                    <p className='explain'>Click the "Start Recording" button in our extension.  choose which part of your screen to capture and who you want to send it to.</p>
                    <div className='rec'>
                        <Rec/>
                    </div>
                </div>
                <div className='how'>
                    <div>
                        <Icon1/>
                    </div>
                    <h4 className='head1'>Share Your Recording</h4>
                    <p className='explain'>We generate a shareable link for your video. Simply send it to your audience via email or copy the link to send via any platform.</p>
                    <div className='rec'>
                        <Rec/>
                    </div>
                </div>
                <div className='how'>
                    <div>
                        <Icon2/>
                    </div>
                    <h4 className='head1'>Learn Effortlessly</h4>
                    <p className='explain'>Recipients can access your video effortlessly through the provided link, with our user-friendly interface suitable for everyone.</p>
                    <div className='rec'>
                        <Rec/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;