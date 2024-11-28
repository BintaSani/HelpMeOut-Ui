import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Copy } from '../../assets/copy.svg';
import { ReactComponent as FB } from '../../assets/Facebook svg.svg';
import { ReactComponent as WhatsaApp } from '../../assets/whatsapp.svg';
import { ReactComponent as Telegram } from '../../assets/Telegram svg.svg';
import axios from 'axios';
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
    const [translatedTranscript, setTranslatedTranscript] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('en'); // Default language is English
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
    
    //   useEffect(() => {
    //     const jobId = transcription || 'nbsTU2yd9BCHPlJE';
    //     const fetchTranscript = async () => {
    //         try{
                
    //             const url = `http://localhost:5000/transcript/${jobId}?language=${language}`;
    //             const translateUrl = `https://lingvanex-translate.p.rapidapi.com/getLanguages?code=en_GB&platform=api`;
    //             const options = {
    //                 method: 'GET',
    //                 headers: {
    //                     'x-rapidapi-key': '46798f9a4fmsh0d936877c36ca89p1dd365jsnf0a71eaeb637',
    //                     'x-rapidapi-host': 'lingvanex-translate.p.rapidapi.com'
    //                 }
    //             };
    //             const response = await fetch(url);
    //             const text = await response.text();  // Get the response as plain text
    //             setTranscript(text);
    //             console.log(response);
    //             if (language !== "en") {
    //                 const translationResponse = await axios.post(
    //                   translateUrl,
    //                   {
    //                     q: text,
    //                     source: "en",
    //                     target: language,
    //                     format: "text",
    //                   },
    //                   {
    //                     headers: {
    //                       "Content-Type": "application/json",
    //                     },
    //                   }
    //                 );
          
    //                 if (translationResponse.status === 200) {
    //                   setTranslatedTranscript(translationResponse.data.translatedText);
    //                 } else {
    //                   throw new Error("Translation failed");
    //                 }
    //               } else {
    //                 setTranslatedTranscript(text); // No translation needed
    //               }
    //             } catch (error) {
    //               console.error("Error fetching or translating transcript:", error.message);
    //             } finally {
    //               setIsLoading(false);
    //             }
    //     };
    //     if (jobId) {
    //         fetchTranscript();
    //       }
          
    //     }, [language, transcription]);
    
    // const fetchLanguages = async () => {
    //     const url = 'https://lingvanex-translate.p.rapidapi.com/getLanguages?code=en_GB&platform=api';
    //     const options = {
    //       method: 'GET',
    //       headers: {
    //         'x-rapidapi-key': '74d58c52f7mshad736b390664c0bp1fbc07jsn859dd46dde9a',  // Your API key
    //         'x-rapidapi-host': 'lingvanex-translate.p.rapidapi.com',  // Host for Lingvanex
    //       },
    //     };
      
    //     try {
    //       const response = await axios(url, options);
    //       console.log(response.data);  // The response data will be here
    //     } catch (error) {
    //       console.error('Error:', error);  // Catch and log any errors
    //     }
    //   };
      
      
    const handleInputChange = (e) => {
      setNewVideoName(e.target.value);
  };

      useEffect(() => {
        // fetchLanguages();
     
        
        const fetchTranscript = async () => {
          
          try {
                
            const revaiResponse =await fetch('http://localhost:5000/transcribe', {
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
            
            const url = `http://localhost:5000/transcript/${jobId}?language=${language}`;
    
            // Fetch the transcript text
            const response = await fetch(url);
            const text = await response.text(); // Get the response as plain text
            setTranscript(text); setTranslatedTranscript(text);
    
            // if (language !== 'en') {
            //   // URL for translation using Lingvanex API
            //   const translateUrl = 'https://lingvanex-translate.p.rapidapi.com/translate';
    
            //   // Prepare the request data for translation
            //   const translationData = {
            //     from: 'en_GB',   // Source language
            //     to: language,    // Target language (from the `language` state)
            //     data: text,      // The transcript text to translate
            //     platform: 'api',
            //   };
    
            //   const options = {
            //     method: 'POST',
            //     headers: {
            //       'x-rapidapi-key': '74d58c52f7mshad736b390664c0bp1fbc07jsn859dd46dde9a', // API key
            //       'x-rapidapi-host': 'lingvanex-translate.p.rapidapi.com', // API host
            //       'Content-Type': 'application/json', // Set content type to JSON
            //     },
            //     data: translationData, // The translation data
            //   };
    
            //   // Send the translation request
            //   const translationResponse = await axios(translateUrl, options);
    
            //   if (translationResponse.status === 200) {
            //     setTranslatedTranscript(translationResponse.data.translatedText); // Set the translated text
            //   } else {
            //     throw new Error('Translation failed');
            //   }
            // } else {
            //   setTranslatedTranscript(text); // No translation needed if language is 'en'
            // }
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
      
      const renameVideo = async (oldPublicId, newPublicId) => {
        try {
          const response = await fetch('http://localhost:5000/rename-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPublicId, newPublicId }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to rename video');
          }
      
          const result = await response.json();
          console.log('Rename Successful:', result);
        } catch (error) {
          console.error('Error renaming video:', error);
        }
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
                            value={disabled ? filename.replace(/^uploads\/[^/]+\//, "") : newVideoName}
                            onChange={handleInputChange}
                            placeholder='HelpMeOut_Video_20232509'
                            type='text' id='edit'/>
                            <div className='edit-icons'>
                              { disabled === true ?
                                <Edit onClick={() => setDisabled(!disabled)}/> :
                                <button onClick={() => { 
                                  renameVideo(filename.replace('.webm', ''), newVideoName);
                                  setDisabled(true);}}>
                                  Save
                              </button>}
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
                        <div className='two subtitle'>
                        {isLoading ? (
                                <p>Loading transcript...</p>
                            ) : (
                                <span className='text'>{translatedTranscript || "No transcript available"}</span>
                            )}
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
                    <h1>Don&aspo;t have an account? <Link>Create account</Link></h1> 
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default RecordedMedia;