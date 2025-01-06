import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Copy } from '../../assets/copy.svg';
import { ReactComponent as FB } from '../../assets/Facebook svg.svg';
import { ReactComponent as WhatsaApp } from '../../assets/whatsapp.svg';
import { ReactComponent as Telegram } from '../../assets/Telegram svg.svg';
import './view.scss';

function View() {
     const [searchParams] = useSearchParams();
    const playBack = searchParams.get('recording');
    const title= searchParams.get('name');
    const [disabled, setDisabled] = useState(true);
    const [newVideoName, setNewVideoName] = useState('');
    const [language, setLanguage] = useState('en'); 
    const [transcript, setTranscript] = useState(null);
    const [translatedTranscript, setTranslatedTranscript] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        };

    const handleInputChange = (e) => {
        setNewVideoName(e.target.value);
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
      
          const result = await response.json();
          console.log('Rename Successful:', result);
        } catch (error) {
          console.error('Error renaming video:', error);
        }
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
                      // console.log('Rev.ai response:', revaiData);
                     
                      const jobId = revaiData.id || 'vSaaIZPHBeVUSfQP' || 'nbsTU2yd9BCHPlJE';
                 
                    // URL for fetching the transcript
                    
                    const url = `https://helpmeout-be.vercel.app/transcript/${jobId}?language=${language}`;
            
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
              

  return (
    <div className='view-container'>
        <p>Home / Recent Videos / <span>{title.split('/').pop().replace('.webm', '')}</span></p>
        <div className='edit-cont'>
            <input 
            disabled={disabled}
            value={disabled ? playBack.split('/').pop() : newVideoName}
            onChange={handleInputChange}
            placeholder='HelpMeOut_Video_20232509'
            type='text' id='edit'/>
            <div className='edit-icons'>
                { disabled === true ?
                <Edit onClick={() => setDisabled(!disabled)}/> :
                <button onClick={() => { 
                    renameVideo(playBack.replace(/^HMO_/, '').replace(/\.webm$/, ''), newVideoName);
                    setDisabled(true);}}>
                    Save
                </button>}
            </div>
        </div>
      <div style={{ height: "70vh", marginTop: "24px", border: "1px solid #B6B3C699", backgroundColor: "#FBFBFB80", borderRadius: "12px", padding: "16px", width: "100%" }}>
            <video
                controls
                width="100%"
                height="100%"
                src={playBack.replace(/\.webm$/, '')}
                alt={playBack}
                style={{ borderRadius: "8px" }}
               
            >
                Your browser does not support the video tag.
            </video>
        
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
        <div className='share-wrapper'>
            <div className='send-cont'>
                <input 
                placeholder='enter email of receiver'
                type='email' id='email'/>
                <button>
                    Send
                </button>
                    
            </div>
            <div className='video-url'>
                {/* <label htmlFor='link'>Video Url</label> */}
                {/* <div className='link-cont'> */}
                    <input 
                    placeholder={playBack ? playBack : 'https://www.helpmeout/HelpMeOut_Video_20232509'}
                    type='link' id='link'/>
                    <button>
                        <Copy onClick={() => copyVideo(playBack ? playBack : '')}/> Copy
                    </button>
                {/* </div> */}
                
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
  )
}

export default View;