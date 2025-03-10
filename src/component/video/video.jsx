import React, { useRef, useState } from 'react';
import { ReactComponent as PlayPause } from '../../assets/play-circle.svg';
import { ReactComponent as PausePlay } from '../../assets/pause-circle.svg';
import { ReactComponent as Volume } from '../../assets/volume-high.svg';
import { ReactComponent as Mute } from '../../assets/volume-mute.svg';
import { ReactComponent as Settings } from '../../assets/setting.svg';
import './video.scss';

const Video = ({source}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState(null);
    // const [searchParams] = useSearchParams(window.location.search);
    // const recording = searchParams.get('recording');
    // const transcriptParams = new useSearchParams(window.location.search).get("transcript");
    // const [videoSrc, setVideoSrc] = useState( recording ? recording : '');

    const togglePlay = () => {
        const video = videoRef.current;

        if (video) {
        if (video.paused || video.ended) {
            video.play().catch((error) => {
                setError(error);
                
              });
            console.log('playing');
        } else {
            video.pause();
            console.log('paused');
        }
        setIsPlaying(!isPlaying);
         
        }
    };

//     const handleVolumeChange = (event) => {
//     // setVolume(Number(event.target.value));
//     // videoRef.current.volume = event.target.value;
//         const volumes = Number(event.target.value);

// // Check to make sure that the volume is between 0 and 1.
//         if (volumes >= 0 && volumes <= 1) {
//             setVolume(volumes);
//             videoRef.current.volume = volumes;
//         }
//     };
    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
      };
    

    const handleProgress = () => {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const percent = (currentTime / duration) * 100;
       
        setProgress(percent);
        setCurrentTime(currentTime);
        setDuration(duration);
      };
    
    const handleSeek = (event) => {
    const seekTime = (event.nativeEvent.offsetX / event.target.clientWidth) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // useEffect(() => {
    //     if(recording) {
    //       setVideoSrc(recording)
    //     }
    //     // fetchTranscript()
    //   }, [recording])

    return(
        <div className='video'>
            <video className='vid'
                ref={videoRef}
                controls={false} 
                onClick={togglePlay}
                onTimeUpdate={handleProgress}
                onError={(e) => setError(e)}
                >
                <source src={source ? source : "/SampleVideo_1280x720_1mb.mp4" } /*src="/SampleVideo_1280x720_1mb.mp4"*/ type='video/mp4'/>
                <source src={source ? source : "/SampleVideo_1280x720_1mb.ogg" } /*src="./SampleVideo_1280x720_1mb.ogg"*/ type="video/Ogg" />
                <source src={source ? source : "/SampleVideo_1280x720_1mb.webm" } /*src="./SampleVideo_1280x720_1mb.webm"*/ type="video/webM" />
                Your browser does not support the video tag.
                {error && console.log(error.message)}
            </video>
            {/* <video src="../../assets/VID_20221229_171522.mp4" width="100%" height="100%" className='vid' controls></video> */}
            <div className="progress-bar" onClick={handleSeek}>
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className='controls'>
                <div className='run-time'>
                    <h3>{formatTime(currentTime)} / {formatTime(duration) || '00:00'}</h3>
                </div>
                <div className='clicks'>
                    <div className='click' onClick={togglePlay}>
                        <div className='first'>
                            {isPlaying ? <PausePlay /> : <PlayPause />}
                        </div>
                        <p>Play</p>
                    </div>
                    <div className='click' onClick={toggleMute}>
                        <div className='second'>
                                {isMuted > 0 ? <Mute /> : <Volume />}
                         </div>
                        <p>Volume</p>
                    </div>
                    <div className='click'>
                        <div className='last'>
                            <Settings/>
                        </div>
                        <p>Settings</p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Video;