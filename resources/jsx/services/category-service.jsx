import { HandleError, GetErrorText, ShowError } from '../utils/error';

let requestOptions = {
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    }
};

function AddCategory(category, notificationCallback, dataCallback){
    const url = '/api/categories';

    let request = Object.assign({
        body: JSON.stringify(category),
        method: 'POST'
    }, requestOptions);

    fetch(url, request)
        .then(HandleError)
        .then(res => {
            res.json().then((res) => {
                notificationCallback({
                    type: 'success',
                    texts: {
                        heading: 'Lovely!',
                        text: 'it\'s added!'
                    }
                });
                if (dataCallback){
                    dataCallback(res)
                }
            })

        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}

function DeleteCategory(category, notificationCallback, dataCallback){
    const url = '/api/categories/' + category;

    let request = Object.assign({
        method: 'DELETE'
    }, requestOptions);

    fetch(url, request)
        .then(HandleError)
        .then(res => {
            res.json().then((res) => {
                notificationCallback({
                    type: 'success',
                    texts: {
                        heading: 'Noted!',
                        text: 'Sorry to see it go'
                    }
                });
                if (dataCallback){
                    dataCallback(res)
                }
            })

        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}



function GetCategories(notificationCallback, dataCallback){
    const url = '/api/categories/';

    let request = Object.assign({
        method: 'GET'
    }, requestOptions);

    fetch(url, request)
        .then(HandleError)
        .then(res => {
            res.json().then((res) => {
                dataCallback(res)
            })

        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}

function UpdateCategory(category, notificationCallback, dataCallback){
    const url = '/api/categories/' + category._id;

    let request = Object.assign({
        body: JSON.stringify(category),
        method: 'PUT'
    }, requestOptions);

    fetch(url, request)
        .then(HandleError)
        .then(res => {
            res.json().then((res) => {
                notificationCallback({
                    type: 'success',
                    texts: {
                        heading: 'Lovely!',
                        text: 'it\'s updated!'
                    }
                });
                if (dataCallback){
                    dataCallback(res)
                }
            })

        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}


export {AddCategory, GetCategories, DeleteCategory, UpdateCategory}