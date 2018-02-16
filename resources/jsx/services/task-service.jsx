import { HandleError, GetErrorText, ShowError } from '../utils/error';

let requestOptions = {
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    }
};

function AddTask(data, notificationCallback, dataCallback){
    const url = '/api/tasks';

    let taskData = {
        name: data.name,
        done: false,
        category: data.categoryId
    };

    let request = Object.assign({
        body: JSON.stringify(taskData),
        method: 'POST'
    }, requestOptions);

    fetch(url, request)
        .then(HandleError)
        .then(res => {
            res.json().then((res) => {
                notificationCallback({
                    type: 'success',
                    texts: {
                        heading: 'A new task!',
                        text: 'Geweldig!'
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

function DeleteTask(id, notificationCallback, dataCallback){
    const url = '/api/tasks/' + id;

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
                        text: 'Completed'
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


function UpdateTask(category, notificationCallback, dataCallback){
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


export {AddTask, DeleteTask, UpdateTask}