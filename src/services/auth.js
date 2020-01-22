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

export {
    signup,
    logout,
    registerAuthObserver
}
