import React from 'react';
import { NavLink } from 'react-router-dom'
import { HandleError, GetErrorText, ShowError } from '../utils/error';
import {LoginUser, LogoutUser, UpdateUser, RegisterUser} from '../services/user-service';
import { ToastContainer } from "react-toastr";
import Profile from '../components/profile';
import Registration from '../components/registration';
import Login from '../components/login';

export default class Home extends React.Component{

    constructor(props) {
        super(props);
    }

    updateUser=(type, user)=>{
        let updateApiCall;
        switch(type){
            case 'login':
                updateApiCall = LoginUser;
                break;
            case 'logout':
                updateApiCall = LogoutUser;
                break;
            case 'register':
                updateApiCall = RegisterUser;
                break;
            case 'update':
                updateApiCall = UpdateUser;
                break;
        }

        updateApiCall(user, this.props.showNotification, this.props.updateUser)
    };


    render() {
        return (
            <div>


                <div  className="app-container">

                    {this.props.user ?
                        <Profile user={this.props.user} updateUser={this.updateUser}/>

                        :

                        <div className="app-grid">

                            <div className="app-margin--m app-grid__item app-grid__item--1-2">
                                <Registration updateUser={this.updateUser}/>
                            </div>
                            <div className="app-margin--m app-grid__item app-grid__item--1-2">
                                <Login updateUser={this.updateUser} />
                            </div>
                        </div>

                    }
                </div>
            </div>
        );
    }
}