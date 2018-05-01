import React from 'react';
import { BrowserRouter as Router,Route,Link,NavLink,Switch, Redirect} from 'react-router-dom';

import Home from './home';
import NotFound from './not-found';
import MainNav from './nav';
import Tasks from './category-list';
import { LogoutUser } from '../services/user-service';
import Notification  from './notification';

let notificationId= 0;

module.exports = class AppRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: window.bootstrappedUserObject,
            notification: {}
        };
    };

    updateUser=(user)=>{
        this.setState({user: user})
    };

    logoutUser=()=>{
        LogoutUser(null, this.showNotification, this.updateUser)
    };

    showNotification=(data)=>{
        data.id = ++notificationId;
        this.setState({
            notification: data
        })
    };

    render() {
        return (
            <Router exact path="/">
                <div>
                    <Notification data={this.state.notification} />
                    <MainNav logoutUser={this.logoutUser} user={this.state.user}/>
                    <Switch>
                        <Route exact path="/"
                               render={(props) => (<Home
                                   user={this.state.user}
                                   showNotification={this.showNotification}
                                   updateUser={this.updateUser}
                                   logoutUser={this.logoutUser}
                                   {...props}/>)}/>

                        <PrivateRoute path="/tasks"
                                      user={this.state.user}
                                      component={Tasks}
                                      showNotification={this.showNotification}/>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => {

    return(

        <Route
            {...rest}
            render={props => rest.user ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )}/>);
};


