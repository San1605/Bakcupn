import React, { useRef, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from './Firebase';
import { useEffect } from 'react';
const FireBaseLogin = () => {
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    const [isSignIn, setIsSignIn] = useState(false);
    const handleClick = () => {
        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                    // ..
                });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
    }
    const resetForm = () => {
        // setErrorMessage("");
        // email.current.value = "";
        // name.current.value = "";
        // password.current.value = ""
    }
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    useEffect(() => {
        resetForm()
    }, [isSignIn])
    return (
        <div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                {!isSignIn && <input type="text" ref={name} />}
                <input type="email" ref={email} />
                <input type="password" name="" id="" ref={password} />
                <button onClick={handleClick}>{isSignIn ? "Sign In" : "Sign up"}</button>
                <p onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "New user Create a new account" : "Already a user please login"}</p>
            </form>
            {errorMessage && <p>{errorMessage}</p>}

            <button onClick={handleGoogleLogin}>Sign in with Google</button>

        </div>
    )
}

export default FireBaseLogin
