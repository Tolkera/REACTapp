import React from 'react';
import { NavLink} from 'react-router-dom';


module.exports = class MainNav extends React.Component {


    render(){

        return(
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
                                                    onClick={this.props.logoutUser}>Logout</button>
                                        </div>
                                    </div>


                                    : null

                            }

                        </div>
                    </nav>
                </div>
            </div>

        )
    }
};
