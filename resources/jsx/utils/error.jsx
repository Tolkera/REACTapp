const errorCodes = {
    1: 'The server seems to be misbehaving. Need to debug!',
    101: 'Username is taken',
    102: 'Passwords do not match',
    103: 'Incorrect username or password',
    105: 'A task should have a name',
    106: 'A category should have a name'
};

function GetErrorText(code){
    return code ? errorCodes[code] :  errorCodes[1]
}

function HandleError(response) {
    if (!response.ok) {
        return Promise.reject(response)
    }
    return response;
}

function ShowError(error, callback){
    console.log(error);

    let errorData = {
        type: 'error',
        texts: {
            heading: 'Hmmmm',
            text: GetErrorText()
        }
    };

    if (error.json) {
        error.json().then(res => {
            errorData.texts.text = GetErrorText(res.code);
            callback(errorData)
        })
    } else {
        callback(errorData)
    }
}

export {errorCodes, GetErrorText, HandleError, ShowError}