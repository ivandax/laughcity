import firebase from 'firebase/app';
import "firebase/auth";

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
    return result.user.uid; //returns true if successful
}

export {
    signup,
    logout,
    login,
    registerAuthObserver
}
