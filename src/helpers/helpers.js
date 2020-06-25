//validate the form inputs when creating an event.
const validateAll = (formData) => {
    const {title,date,participants} = formData;
    if(title){
        //if(date){
            if(participants.length){
                return true; //success case, otherwise returns a [false, "message"] array
            } else{
                return [false, "At least one participant must be added."]
            }
        // } else{
        //     return [false, "A date must be selected."]
        // }
    } else{
        return [false, "Title must be provided."]
    }
}

//let trial = {'John':{count:0,order:2}, "Luke":{count:0,order:1}, "Mark":{count:0,order:0}}
const orderObject = (object) => {
    const sortable = [];
    for (let element in object){
        sortable.push([element, object[element].order, object[element].count]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    return sortable;
}

const arrayIntoList = (array, type) => {
    const dataObject = {};
    if(type==="Favorite"){
        array.forEach( (elem,index) => {
            dataObject[elem] = {count: [], order: index};
        }) 
    }
    return dataObject;
}

const makeIdentifier = (email, id, length) => {
    return `${email.substring(0,2).toLowerCase()}${id.substring(0,2).toLowerCase()}${length}`
}

export {
    validateAll,
    arrayIntoList,
    orderObject,
    makeIdentifier
}