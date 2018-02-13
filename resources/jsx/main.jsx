import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Registration from './components/registration';
import Login from './components/login';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: window.bootstrappedUserObject,
        };

        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(user){
        this.setState({user: user})
    }

    render() {
        return (
            <div>
                <Router exact path="/">
                    <div>
                        <Route exact path="/"
                               />
                        <Route exact path="/"
                               render={(props) => (<Home
                               user={this.state.user}
                               updateUser={this.updateUser}
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
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                    {this.props.user ?
                        'Profile' :

                        <div>
                            <Registration updateUser={this.props.updateUser}/>
                            <Login updateUser={this.props.updateUser} />
                        </div>
                    }
            </div>
        );
    }
}

ReactDOM.render(<Main  />, document.getElementById('js-app'));
