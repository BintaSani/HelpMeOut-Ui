import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Copy } from '../../assets/copy.svg';
import { ReactComponent as FB } from '../../assets/Facebook svg.svg';
import { ReactComponent as WhatsaApp } from '../../assets/whatsapp.svg';
import { ReactComponent as Telegram } from '../../assets/Telegram svg.svg';
import './recorded-media.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import Video from '../video/video';


const RecordedMedia = () => {
    const [disabled, setDisabled] = useState(true);
    const [searchParams] = useSearchParams();
    const FileName = searchParams.get('filename');
    const playBack = searchParams.get('recording')
    const [filename, setFilename] = useState(() =>
        // window.location.search('filename')
        FileName ? FileName : ''
    );
    // const [playbackUrl, setPlaybackUrl] = useState(
    //     window.location.search('recording')
    // );
    const copyVideo = async (url) => {
        if (navigator.clipboard) {
          await navigator.clipboard
            .writeText(url)
            .then(function () {
              alert('URL copied to clipboard')
            })
            .catch(function (err) {
              console.error('Failed to copy URL: ' + err);
            });
        } else {
          console.log("can't copy on this device");
        }
      }
    
    return(
        <div className='recorded-media'>
            <Header/>
            <div className='cont3'>
                <div className='send'>
                    <h1>Your video is ready!</h1>
                    <div className='edit'>
                        <label htmlFor='edit'>Name</label>
                        <div className='edit-cont'>
                            <input 
                            disabled={disabled}
                            defaultValue={`${filename}`}
                            placeholder='HelpMeOut_Video_20232509'
                            type='text' id='edit'/>
                            <div className='edit-icons'>
                                <Edit onClick={() => setDisabled(!disabled)}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className='send-cont'>
                        <input 
                        placeholder='enter email of receiver'
                        type='email' id='email'/>
                        <button>
                            Send
                        </button>
                          
                    </div>
                    <div className='video-url'>
                        <label htmlFor='link'>Video Url</label>
                        <div className='link-cont'>
                            <input 
                            placeholder={playBack ? playBack : 'https://www.helpmeout/HelpMeOut_Video_20232509'}
                            type='link' id='link'/>
                            <button>
                            <Copy onClick={() => copyVideo(playBack ? playBack : '')}/> Copy
                            </button>
                        </div>
                        
                    </div>
                    <div className='share-vid'>
                        <h2>Share your video</h2>
                    </div>
                    <div className='socials-cont'>
                        <button className='socials'>
                            <div>
                                <FB/>
                            </div>
                            <p>Facebook</p>
                        </button>
                        <button className='socials'>
                            <div>
                                <WhatsaApp/>
                            </div>
                            <p>WhatsApp</p>
                        </button>
                        <button className='socials'>
                            <div>
                                <Telegram/>
                            </div>
                            <p>Telegram</p>
                        </button>
                    </div>
                </div>

                <div className="vid-cont">
                    <div className='video-cont'>
                        {/* <video src="" width="100%" height="100%" className='vid' controls></video> */}
                        <Video/>
                    </div>
                    <div className='transcript-cont'>
                        <h5>Transcript</h5>
                        <select name='language' id='language'>
                            <option className='option' value="English">English</option> 
                            <option className='option' value="French">French</option> 
                            <option className='option' value="spanish">Spanish</option> 
                            <option className='option' value="mandarin">Mandarin</option> 
                        </select>
                    </div>
                    <div className='transcript'>
                        <div className='one subtitle'>
                            <span>0.01</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span>
                        </div>
                        <div className='two subtitle'>
                            <span>0.02</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span>
                        </div>
                        <div className='three subtitle'>
                            <span>0.03</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span>
                        </div>
                        <div className='four subtitle'>
                            <span>0.04</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='create-account'>
                <div className='cont4'>
                    <h4>To ensure the availability and privacy of your video, we recommend saving it to your account.</h4>
                    <div><button>Save Video</button></div>
                    <h1>Don’t have an account? <Link>Create account</Link></h1> 
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default RecordedMedia;