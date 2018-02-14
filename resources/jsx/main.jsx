import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'
import { ToastContainer } from "react-toastr";
import Profile from './components/profile';
import Registration from './components/registration';
import Login from './components/login';

import Notification  from './components/notification';
import { HandleError, GetErrorText, ShowError } from './utils/error';

let notificationId = 0;

let requestOptions = {
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    }
};

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: window.bootstrappedUserObject
        };

        this.updateUser = this.updateUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    updateUser(user){
        this.setState({user: user})
    }

    logoutUser(){
        this.setState({user: null});
    }

    render() {
        return (
            <div>
                <Router exact path="/">
                    <div>
                        <Route exact path="/"
                               render={(props) => (<Home
                               user={this.state.user}
                               updateUser={this.updateUser}
                               logoutUser={this.logoutUser}
                               {...props}/>)}/>
                    </div>
                    </Router>

                </div>
        );
    }
}

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {notification: {}};
        this.logoutUser = this.logoutUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    showNotification(data){
        data.id = ++notificationId;
        this.setState({
            notification: data
        })
    }

    logoutUser(){

        const url = '/logout';

        let request = Object.assign({
            method: 'GET'
        }, requestOptions);

        fetch(url, request)
            .then(HandleError)
            .then(res => {
                this.showNotification({
                    type: 'success',
                    texts: {
                        heading: 'Bye-Bye',
                        text: 'I will miss you'
                    }
                });
                this.props.logoutUser();
            })
            .catch((error) => {
                ShowError(error, this.showNotification)
            })
    }

    updateUser(user){
        const url = '/api/users';

        let request = Object.assign({
            body: JSON.stringify(user),
            method: 'PUT'
        }, requestOptions);

        fetch(url, request)
            .then(HandleError)
            .then(res => {
                this.showNotification({
                    type: 'success',
                    texts: {
                        heading: 'Lovely!',
                        text: 'Your profile is updated!'
                    }
                });
                this.props.updateUser(user);
            })
            .catch((error) => {
                ShowError(error, this.showNotification)
            })
    }

    registerUser(user){

        let url = '/api/users';

        let request = Object.assign({
            body: JSON.stringify(user),
            method: 'POST'
        }, requestOptions);

        fetch(url, request)
            .then(HandleError)
            .then(res => {
                res.json().then((res) => {
                    this.showNotification({
                        type: 'success',
                        texts: {
                            heading: 'Great',
                            text: 'Your profile is live!'
                        }
                    });
                    this.props.updateUser(res);
                })

            })
            .catch((error) => {
                ShowError(error, this.showNotification)
            })
    }

    render() {
        return (

            <div  className="app-container">

                <Notification data={this.state.notification} />

                <div className="app-header">
                    <div className="app-container">
                        <nav className="">
                            <div className="app-grid">
                                <div className="app-grid__item app-grid__item--1-4">
                                    <div className="app-header__name">
                                        React App
                                    </div>

                                </div>
                                { this.props.user ?
                                    <div className="app-grid__item app-grid__item--1-2" >
                                        <ul className="">
                                            <li className="app-nav-item">
                                                <NavLink className="app-nav-link" activeClassName="app-nav-link--active" exact to="/">Profile</NavLink>
                                            </li>
                                            <li className="app-nav-item">
                                                <NavLink className="app-nav-link" activeClassName="app-nav-link--active" to="/tasks">Tasks</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    : null
                                }

                                {
                                    this.props.user ?
                                        <div className="app-grid__item app-grid__item--1-4">
                                            <div className="app-header__user">Welcome, {this.props.user.firstName}
                                                <button className="app-header__logout-btn app-btn app-btn--neutral"
                                                        onClick={this.logoutUser}>Logout</button>
                                            </div>
                                        </div>

                                    : null

                                }

                                </div>


                            </nav>
                        </div>
                    </div>

                    {this.props.user ?
                        <Profile user={this.props.user} updateUser={this.updateUser}/>

                        :

                        <div className="app-grid">

                            <div className="app-margin--m app-grid__item app-grid__item--1-2">
                                <Registration registerUser={this.registerUser}/>
                            </div>
                            <div className="app-margin--m app-grid__item app-grid__item--1-2">
                                <Login updateUser={this.props.updateUser} />
                            </div>
                        </div>

                    }
            </div>
        );
    }
}

ReactDOM.render(<Main  />, document.getElementById('js-app'));
