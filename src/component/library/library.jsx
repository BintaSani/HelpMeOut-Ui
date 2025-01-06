import React, {useState, useEffect} from 'react';
import './library.scss';
import {ReactComponent as Search} from '../../assets/search.svg';
import {ReactComponent as Link} from '../../assets/link.svg';
import {ReactComponent as Options} from '../../assets/option.svg';
import { useNavigate } from 'react-router';
import { auth } from '../utils/firebase/firebase';

function Library() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  let user = auth.currentUser ? auth.currentUser._delegate : null;
  // console.log(user);

  useEffect(() => {
    if (!user) {
      return; // Wait for user to be available
    }
    const fetchVideos = async () => {
      const folderPath = `uploads/${user.uid}`;
      try {
        const response = await fetch(`https://helpmeout-be.vercel.app/api/videos?folderPath=${encodeURIComponent(folderPath)}`); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
        // console.log(data)
      } catch (error) {
        setError(error.message);
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user, user.uid]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error fetching videos: {error}</p>;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate); // Parse ISO date string
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Desired format options
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase(); // Format and convert to uppercase
  
    return formattedDate;
  }

  return (
    <div className='library'>
      <div className='top-container'>
        <div className='welcome'>
          <h1>Hello, {user.displayName}</h1>
          <p>Here are your recorded videos</p>
        </div>
        <div className='search'>
          <Search />
          <input type='search' placeholder='Search for a particular video' />
        </div>
      </div>
      <div className='bottom-container'>
        <div className='videos'>
          <p>Recent files</p>
          <div className='videos-container'>
          
            {videos.map((video) => (
              <div key={video.public_id} style={{ border: "1px solid #B6B3C699", backgroundColor: "#FBFBFB80", borderRadius: "12px", padding: "16px", width: "45%" }}>
                <video
                  controls={false}
                  width="100%"
                  src={video.url}
                  alt={video.public_id}
                  style={{ borderRadius: "8px" }}
                  onClick={() => navigate(`/library/video?recording=${video.url}&name=${video.public_id}.webm`)}
                >
                  Your browser does not support the video tag.
                </video>
                <div>
                  <div>
                    <p className='name'>{video.public_id.split("/").pop()}.{video.format}</p>
                    <p className='created'>{formatDate(video.date_created)}</p>
                  </div>
                  <div style={{display: "flex", paddingTop: "16px", gap: "24px"}} >
                    <Link/>
                    <Options/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library