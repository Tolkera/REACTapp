import { HandleError, GetErrorText, ShowError } from '../utils/error';

let requestOptions = {
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    }
};


function LoginUser(user, notificationCallback, dataCallback){
    const url = '/api/login';

    let request = Object.assign({
        body: JSON.stringify(user),
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
                        text: 'You are in!'
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

function LogoutUser(user, notificationCallback, dataCallback){
    const url = '/logout';

    let request = Object.assign({
        method: 'GET'
    }, requestOptions);

    fetch(url, request)
        .then(HandleError)
        .then(res => {
            notificationCallback({
                type: 'success',
                texts: {
                    heading: 'Bye-Bye',
                    text: 'I will miss you'
                }
            });
            if (dataCallback){
                dataCallback(null)
            }
        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}

function UpdateUser(user, notificationCallback, dataCallback) {
    const url = '/api/users';

    let request = Object.assign({
        body: JSON.stringify(user),
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
                        text: 'Your profile is updated!'
                    }
                });
                if (dataCallback) {
                    dataCallback(res)
                }
            })

        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}


function RegisterUser(user, notificationCallback, dataCallback) {
    const url = '/api/users';

    let request = Object.assign({
        body: JSON.stringify(user),
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
                        text: 'Your profile is live!'
                    }
                });
                if (dataCallback) {
                    dataCallback(res)
                }
            })

        })
        .catch((error) => {
            ShowError(error, notificationCallback)
        })
}

export {LoginUser, LogoutUser, UpdateUser, RegisterUser}