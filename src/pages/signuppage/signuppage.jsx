import React from 'react';
import './signuppage.scss';
import { ReactComponent as Logo } from '../../assets/Frame 249.svg'; 
import SignUp from '../../component/signup/signup';

const SignUpPage = () => {
    return(
        <div className='sign-up-page'>
            <div className='help'>
                <Logo/>
            </div>
            <SignUp/>
        </div>
    )
}

export default SignUpPage;