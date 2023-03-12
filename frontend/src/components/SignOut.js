import React from 'react';
import firebase from 'firebase';

const SignOut = () => {
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('Signed out');
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