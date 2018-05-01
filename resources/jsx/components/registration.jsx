import React from 'react';

class Registration extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isValid: false
        };
    }

    validate(){

        let {username, firstName, password, passwordRepeat} = this.state;

        return {
            username: !!username,
            firstName: !!firstName,
            password: !!password,
            passwordRepeat: !!passwordRepeat,
            doPasswordsMatch: (password && passwordRepeat && passwordRepeat === password)
        };
    };

    isValid(){
        let errors = this.validate();
        return Object.keys(errors).every(x => errors[x])
    }

    updateUser =(e)=>{

        e.preventDefault();

        let user = {
            username: this.state.username,
            firstName: this.state.firstName,
            password: this.state.password,
            passwordRepeat: this.state.passwordRepeat
        };

        this.props.updateUser('register', user);
    }

    handleInputChange =(e) =>{

        this.setState({
            [e.target.name] : e.target.value
        });

    }

    render(){

        let isValid = this.isValid();

        return(
            <div>
                <h2 className="app-heading--secondary">Register</h2>
                <form>
                    <div className="app-margin--m">
                        <label>Name</label>
                        <input type="text" className="app-form-control app-margin--xs"
                               required
                               name="username"
                               onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="app-margin--m">
                        <label>First Name</label>
                        <input type="text" className="app-form-control app-margin--xs"
                               required
                               name="firstName"
                               onChange={this.handleInputChange}
                              />
                    </div>
                    <div className="app-margin--m">
                        <label>Password</label>
                        <input type="password" className="app-form-control app-margin--xs"
                               required
                               name="password"
                               onChange={this.handleInputChange}
                                />
                    </div>
                    <div className="app-margin--m">
                        <label>Repeat your password</label>
                        <input type="password" className="app-form-control app-margin--xs"
                               required
                               name="passwordRepeat"
                               onChange={this.handleInputChange}
                                />
                    </div>
                    <button disabled={!isValid} onClick={this.updateUser} className="app-btn app-btn--attention app-margin--m"
                    >Submit</button>

                </form>

            </div>
        )
    }
}

module.exports = Registration;
