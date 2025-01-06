import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../../assets/Frame 249.svg'; 
import { useNavigate } from 'react-router-dom';
import { auth} from '../../component/utils/firebase/firebase';
import View from '../../component/view/view';
import { Spinner } from '../library/library';
import './viewpage.scss';

function ViewPage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user?._delegate || null);
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        navigate('/')
    }

    const renderUserInfo = () => {
        if (!currentUser) return null;

        return (
            <div className="user-info">
                <img
                    src={currentUser.photoURL || ''}
                    alt={`${currentUser.displayName}'s avatar`}
                    className="user-info__avatar"
                />
                <span className="user-info__username">{currentUser.displayName}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="user-info__dropdown-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        );
    };

    if (loading) {
        return <Spinner />;
    }

    if (!currentUser) {
        navigate('/'); // Redirect to home if no user is logged in
        return null;
    }

  return (
    <div className='view'>
        <div className='help'>
            <Logo onClick={handleClick}/>
            {renderUserInfo()}
        </div>
        <View/>
    </div>
  )
}

export default ViewPage;