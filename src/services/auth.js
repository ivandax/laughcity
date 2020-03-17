import firebase from 'firebase/app';
import "firebase/auth";

async function signup(email, password){
    const createResult = await firebase.auth().createUserWithEmailAndPassword(email,password);
    if(createResult){
        await firebase.auth().currentUser.sendEmailVerification();
        await firebase.auth().signOut();
    }
}

function logout(){
    firebase.auth().signOut();
}

function registerAuthObserver(callback) {
    return firebase.auth().onAuthStateChanged(callback);
}

async function login(email,password){
    const result = await firebase.auth().signInWithEmailAndPassword(email,password);
    return result.user.uid;
}

export {
    signup,
    logout,
    login,
    registerAuthObserver
}
