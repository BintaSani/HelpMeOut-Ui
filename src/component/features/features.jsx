import React from 'react';
import { ReactComponent as Record } from '../../assets/record.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as Revisit } from '../../assets/revisit.svg';
import { ReactComponent as Repo } from '../../assets/Video Repository.svg';
import './features.scss';


const Features = () => {
    return(
        <div className='features'>
            <section>
                <div className='head'>
                    <h1>Features</h1>
                    <p>Key Highlights of Our Extension</p>
                </div>
                <div className='cont'>
                    <div className='explanation'>
                        <div className='record box'>
                            <div>
                                <Record/>
                            </div>
                            {/* <img className='icons' src='https://i.ibb.co/71wDrn8/Icon-placeholder.png' alt='record'/> */}
                            <div className='details'>
                                <h3>Simple Screen Recording</h3>
                                <p>Effortless screen recording for everyone. Record with ease, no tech expertise required.</p>
                            </div>
                        </div>
                        <div className='share box'>
                            <div>
                                <Share/>
                            </div>
                            {/* <img className='icons' src='https://i.ibb.co/rctcd7q/Icon-placeholder-1.png' alt='share'/> */}
                            <div className='details'>
                                <h3>Easy-to-Share URL</h3>
                                <p>Share your recordings instantly with a single link. No attachments, no downloads.</p>
                            </div>
                        </div>
                        <div className='revisit box'>
                            <div>
                                <Revisit/>
                            </div>
                            {/* <img className='icons' src='https://i.ibb.co/k9zmVnn/Icon-placeholder-2.png' alt='revisit'/> */}
                            <div className='details'>
                                <h3>Revisit Recordings</h3>
                                <p>Access and review your past content effortlessly. Your recordings, always at your fingertips.</p>
                            </div>
                        </div>

                    </div>
                    <div className='visual'>
                        {/* <img className='repo-img' src='https://i.ibb.co/QPswVC3/Video-Repository.png' alt='repo-pic'/> */}
                        <Repo/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Features;