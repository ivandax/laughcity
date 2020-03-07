import firebase from 'firebase/app';
import "firebase/firestore";

function parseDoc(doc){
    return {
        id: doc.id,
        ...doc.data()
    }
}

let db;
function getDbInstance(){
    if(!db || db._isTerminated){
        db = firebase.firestore();
    }
    return db;
}

async function addItemWithId(collection, item, id){
    const db = getDbInstance();
    const result = await db.collection(collection).doc(id).set(item);
    return !result;
}

async function getItem(collection, itemId) {
    const db = getDbInstance();
    const document = await db.collection(collection).doc(itemId).get();
    if(document.exists){
        return parseDoc(document);
    }
    return null;
}

export{
    addItemWithId,
    getItem,
}