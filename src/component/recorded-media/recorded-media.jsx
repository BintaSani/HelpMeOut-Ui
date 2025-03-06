import React, { useState, useEffect } from 'react';
import {  useSearchParams } from 'react-router-dom';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Copy } from '../../assets/copy.svg';
import { ReactComponent as FB } from '../../assets/Facebook svg.svg';
import { ReactComponent as WhatsaApp } from '../../assets/whatsapp.svg';
import { ReactComponent as Telegram } from '../../assets/Telegram svg.svg';
// import axios from 'axios';
import './recorded-media.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import Video from '../video/video';


const RecordedMedia = () => {
  const [disabled, setDisabled] = useState(true);
  const [newVideoName, setNewVideoName] = useState('');
  const [searchParams] = useSearchParams();
  const FileName = searchParams.get('filename');
  const playBack = searchParams.get('recording');
  // const transcription = searchParams.get('transcript');
  const [transcript, setTranscript] = useState(null);
  // const [translatedTranscript, setTranslatedTranscript] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default language is English
  const [recipientEmail, setRecipientEmail] = useState('');
    const [filename, setFilename] = useState(() =>
        // window.location.search('filename')
        FileName ? FileName : ''
    );
    

    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };

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
    

    const handleSendEmail = () => {
      const subject = encodeURIComponent('Check out this video!');
      const body = encodeURIComponent(`Hi there, Here is a video I thought you might enjoy: ${playBack} \nBest regards,`);
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    };

      
    const handleInputChange = (e) => {
      setNewVideoName(e.target.value);
  };

      useEffect(() => {
        // fetchLanguages();
     
        
        const fetchTranscript = async () => {
          
          try {
                
            const revaiResponse =await fetch('https://helpmeout-be.vercel.app/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ playBack }),
            });
            if (!revaiResponse.ok) {
                console.error('Error sending video to Rev.ai:', revaiResponse.statusText);
                return;
              }
              await new Promise(resolve => setTimeout(resolve, 30000)); 
              const revaiData = await revaiResponse.json();
              console.log('Rev.ai response:', revaiData);
             
              const jobId = revaiData.id || 'vSaaIZPHBeVUSfQP' || 'nbsTU2yd9BCHPlJE';
         
            // URL for fetching the transcript
            
            const url = `https://helpmeout-be.vercel.app/transcript/${jobId}?language=${language}`;
    
            // Fetch the transcript text
            const response = await fetch(url);
            const text = await response.text(); // Get the response as plain text
            setTranscript(text); 
            // setTranslatedTranscript(text);
    
            
          } catch (error) {
            console.error('Error fetching or translating transcript:', error.message);
          } finally {
            setIsLoading(false); // Set loading state to false once done
          }
        };
    
        // Fetch the transcript if `jobId` exists
        // if (jobId) {
          fetchTranscript();
        // }
      }, [language, playBack ]); // Dependencies: language and transcription
      
      const renameVideo = async (publicId, newName) => {
        try {
          const response = await fetch('https://helpmeout-be.vercel.app/api/videos/rename', {
            method: 'PUT', // Change to PUT method as per your backend
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public_id: publicId, new_name: newName }), // Send correct fields
          });
      
          if (!response.ok) {
            throw new Error('Failed to rename video');
          }
      
          // const result = await response.json();
          // console.log('Rename Successful:', result);
          alert('Rename Successful');
        } catch (error) {
          console.error('Error renaming video:', error);
        }
      };
      
      const facebookShare = (playBack) => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(playBack)}`;
        window.open(url, '_blank');
      };
        
      const telegramShare = (playBack) => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(playBack)}`;
        window.open(url, '_blank');
      };
        
      const whatsappShare = (playBack) => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(playBack)}`;
        window.open(url, '_blank');
      };
      
      
    
    
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
                            value={disabled ? filename.replace(/^HMO_([^/]+)\/[^/]+\/([^/]+\.webm)$/, 'HMO_$2') : newVideoName}
                            onChange={handleInputChange}
                            placeholder='HelpMeOut_Video_20232509'
                            type='text' id='edit'/>
                            <div className='edit-icons'>
                              { disabled === true ?
                                <Edit onClick={() => setDisabled(!disabled)}/> :
                                <button onClick={() => { 
                                  renameVideo(filename.replace(/^HMO_/, '').replace(/\.webm$/, ''), newVideoName);
                                  setDisabled(true);}}>
                                  Save
                              </button>}
                            </div>
                        </div>
                        
                    </div>
                    <div className='send-cont'>
                        <input 
                        placeholder='enter email of receiver'
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        type='email' 
                        id='email'
                        />
                        <button onClick={handleSendEmail}>
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
                        <button className='socials'
                        onClick={() => facebookShare(playBack)}>
                            <div>
                                <FB/>
                            </div>
                            <p>Facebook</p>
                        </button>
                        <button className='socials'
                        onClick={() => whatsappShare(playBack)}>
                            <div>
                                <WhatsaApp/>
                            </div>
                            <p>WhatsApp</p>
                        </button>
                        <button className='socials'
                        onClick={() => telegramShare(playBack)}>
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
                        <Video source={playBack}/>
                    </div>
                    <div className='transcript-cont'>
                        <h5>Transcript</h5>
                        <select name='language' id='language' onChange={handleLanguageChange} value={language}>
                            <option className='option' value="en_GB">English</option> 
                            {/* <option className='option' value="fr">French</option> 
                            <option className='option' value="es">Spanish</option> 
                            <option className='option' value="de">German</option>  */}
                        </select>
                    </div>
                    <div className='transcript'>
                        

                        <div className='one subtitle'>
                            {transcript ? (
                                <span className='text'>{transcript}</span>
                            ) : (
                                <p>No transcript available.</p>
                            )}
                            {/* <span>0.01</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span> */}
                        </div>
                        {/* <div className='two subtitle'>
                        {isLoading ? (
                                <p>Loading transcript...</p>
                            ) : (
                                <span className='text'>{translatedTranscript || "No transcript available"}</span>
                            )}
                        </div> */}
                        {/* <div className='three subtitle'>
                            <span>0.03</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span>
                        </div>
                        <div className='four subtitle'>
                            <span>0.04</span>
                            <span className='text'>First step. Open Facebook on your desktop or mobile device and locate "Marketplace" in the left-hand menu or at the top of the </span>
                        </div> */}
                        
                    </div>
                </div>
            </div>
            <div className='create-account'>
                <div className='cont4'>
                    <h4>To ensure the availability and privacy of your video, we recommend saving it to your account.</h4>
                    <div><button> <a href="/library">Save Video</a></button></div>
                    <h1>Don't have an account? <a className='link' href='/signup'>Create account</a></h1> 
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default RecordedMedia;