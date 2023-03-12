import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const SignOut = ({setLogIn}) => {
    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(() => {
            console.log('Signed out');
            setLogIn(true)
                
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOut;