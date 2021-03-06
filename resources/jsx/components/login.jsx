import React from 'react';

module.exports = class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            isValid: false
        };
    }

    validate(){

        let {username, password} = this.state;

        return {
            username: !!username,
            password: !!password
        };
    };

    isValid(){
        let errors = this.validate();
        return Object.keys(errors).every(x => errors[x])
    }

    handleInputChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    loginUser = (e)=>{
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.updateUser('login', user);

    };

    render(){

        let isValid = this.isValid();

        return(
            <div>
                <h2 className="app-heading--secondary">Login</h2>
                <form className="app-margin--m">
                    <div className="">
                        <label>Name</label>
                        <input type="text"
                               name="username"
                               className="app-form-control app-margin--xs"
                               required
                               onChange={this.handleInputChange}
                                name="username" />
                    </div>

                    <div className="app-margin--m">
                        <label>Password</label>
                        <input type="password"
                               name="password"
                               className="app-form-control app-margin--xs"
                               required
                               onChange={this.handleInputChange}
                                />
                    </div>
                    <button disabled={!isValid} onClick={this.loginUser} className="app-btn app-btn--attention app-margin--m"
                    >Login</button>
                </form>
            </div>
        )
    }
};
