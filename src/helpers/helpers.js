//validate the form inputs when creating an event.
const validateAll = (formData) => {
    const {title,date,participants} = formData;
    console.log(title,date,participants);
    if(title){
        if(date){
            if(participants.length){
                return true; //success case, otherwise returns a [false, "message"] array
            } else{
                return [false, "At least one participant must be added."]
            }
        } else{
            return [false, "A date must be selected."]
        }
    } else{
        return [false, "Title must be provided."]
    }
}

const arrayIntoList = (array, type) => {
    const dataObject = {};
    if(type==="Favorite"){
        array.forEach( (elem) => {
            dataObject[elem] = 0;
        }) 
    }
    return dataObject;
}

export {
    validateAll,
    arrayIntoList
}