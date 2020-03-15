import firebase from 'firebase/app';
import "firebase/auth";

// var actionCodeSettings = {
//     url: 'https://cherry-rate-app.firebaseapp.com/',
//     handleCodeInApp: true,
//     iOS: {
//       bundleId: 'com.example.ios'
//     },
//     android: {
//       packageName: 'com.example.android',
//       installApp: true,
//       minimumVersion: '12'
//     },
//     dynamicLinkDomain: 'example.page.link'
// };

// async function signUpLink(email,actionCodeSettings){
//     const result = firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//     .then(function() {
//         console.log("email sent!!!")
//         window.localStorage.setItem('emailForSignIn', email);
//     })
//     .catch(function(error) {
//         console.log(error)
//     });
// }

function signup(email, password){
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
        console.log(error);
    });
}

function logout(){
    firebase.auth().signOut();
}

function registerAuthObserver(callback) {
    return firebase.auth().onAuthStateChanged(callback);
}

async function login(email,password){
    const result = await firebase.auth().signInWithEmailAndPassword(email,password);
    console.log(result)
    return result.user.uid; //returns true if successful
}

export {
    signup,
    logout,
    login,
    registerAuthObserver
}
