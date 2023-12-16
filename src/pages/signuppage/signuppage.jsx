import React from 'react';
import './signuppage.scss';
import { ReactComponent as Logo } from '../../assets/Frame 249.svg'; 
import SignUp from '../../component/signup/signup';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    }
    return(
        <div className='sign-up-page'>
            <div className='help'>
                <Logo onClick={handleClick}/>
            </div>
            <SignUp/>
        </div>
    )
}

export default SignUpPage;