import React from 'react';
import { ReactComponent as Google } from '../../assets/Google svg.svg';
import { ReactComponent as FaceBook } from '../../assets/Facebook svg.svg';
import './signup.scss';

const SignUp = () => {
    return(
        <div className='sign-up'>
            <h1 className='create'>Log in or Sign up</h1>
            <p className='invite'>Join millions of others in sharing successful moves on HelpMeOut.</p>
            <button className='google btn'><div className='wrap'><Google/></div><p>Continue with Google</p></button>
            <button className='fb btn'><div className='wrap'><FaceBook/></div><p>Continue with Facebook</p></button>
            <div className='lines'>
                <hr></hr>
                <p>or</p>
                <hr></hr>
            </div>
            <form className='forms'>
                <label className='tag'>Email</label>
                <br/>
                <input className='input' type='email' placeholder='Enter your email address'/>
                <br/>
                <label className='tag'>Password</label>
                <br/>
                <input className='input' type='password' placeholder='Enter your Password'/>
                <br/>
                <button>Sign Up</button>
            </form>


        </div>
    )
}

export default SignUp;