import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,NavLink,Switch, Redirect} from 'react-router-dom';
import Home from './components/home';
import NotFound from './components/not-found';
import MainNav from './components/nav';
import Tasks from './components/tasks';
import { LogoutUser } from './services/user';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: window.bootstrappedUserObject
        };

        this.updateUser = this.updateUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this)
    }

    updateUser(user){
        this.setState({user: user})
    }

    logoutUser(){
        LogoutUser(null, ()=>{}, this.updateUser)
    }

    render() {
        return (
            <div>
                <Router exact path="/">
                    <div>
                        <MainNav logoutUser={this.logoutUser} user={this.state.user}/>
                        <Switch>
                            <Route exact path="/"
                                   render={(props) => (<Home
                                   user={this.state.user}
                                   updateUser={this.updateUser}
                                   logoutUser={this.logoutUser}
                                   {...props}/>)}/>

                            <Route exact path="/tasks1"
                                   render={(props) => (<Tasks
                                   user={this.state.user}
                                   {...props}/>)}/>


                            <PrivateRoute path="/tasks" user={this.state.user} component={Tasks} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    </Router>
                        <div className="app-container">

                            <div className="app-about app-dimmed app-border  app-margin--xxl">

                                This is a simple ReactJS/ NodeJS / MongoDB app with basic functionality:
                                <img src="images/bosch--s.png" className="app-logo" alt=""/>
                                    <br />
                                    <br />
                                        1. Registering, logging in and logging out <br />
                                        2. Editing your profile after registration <br />
                                        3. Creating categories of items, deleting them and updating them <br />
                                        4. Routing (restricted for logged in, 404)
                            </div>

                        </div>
                </div>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {

    return(

        <Route
            {...rest}
            render={props =>
      rest.user ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
        />
    );
}


ReactDOM.render(<Main  />, document.getElementById('js-app'));
