import React, { useState } from 'react';
import { ReactComponent as Google } from '../../assets/Google svg.svg';
import { ReactComponent as FaceBook } from '../../assets/Facebook svg.svg';
import './signup.scss';
import { CreateUserProfileDocument, SignInWithFacebook, SignInWithGoogle, auth } from '../utils/firebase/firebase';

const SignUp = () => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const {email,password} = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await CreateUserProfileDocument(user);

            setCredentials({
                email: '',
                password: ''
            })
        } catch (error){
            console.log('Error creating account: ' + error.message)
        }
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setCredentials({...userCredentials, [name]: value});
    }
    return(
        <div className='sign-up'>
            <h1 className='create'>Log in or Sign up</h1>
            <p className='invite'>Join millions of others in sharing successful moves on HelpMeOut.</p>
            <button className='google btn' onClick={SignInWithGoogle} ><div className='wrap'><Google/></div><p>Continue with Google</p></button>
            <button className='fb btn'onClick={SignInWithFacebook}><div className='wrap'><FaceBook/></div><p>Continue with Facebook</p></button>
            <div className='lines'>
                <hr></hr>
                <p>or</p>
                <hr></hr>
            </div>
            <form className='forms' onSubmit={handleSubmit}>
                <label className='tag'>Email</label>
                <br/>
                <input className='input' name='email' value={email} onChange={handleChange} type='email' placeholder='Enter your email address' required autoComplete='true'/>
                <br/>
                <label className='tag'>Password</label>
                <br/>
                <input className='input' name='password' value={password} onChange={handleChange} type='password' placeholder='Enter your Password' required/>
                <br/>
                <button type='submit'>Sign Up</button>
            </form>


        </div>
    )
}

export default SignUp;