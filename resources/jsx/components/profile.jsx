import React from 'react';

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isValid: true,
            firstName: this.props.user.firstName,
            password: '',
            passwordRepeat: ''
        };

        this.updateUser = this.updateUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(){

        if ((this.state.password || this.state.passwordRepeat) && (this.state.password !== this.state.passwordRepeat)){
            return false
        }
        return true;
    };

    isValid(){
        let errors = this.validate();
        return Object.keys(errors).every(x => errors[x])
    }

    updateUser(e){

        e.preventDefault();

        let user = {
            _id: this.props.user._id,
            firstName: this.state.firstName,
            password: this.state.password,
            passwordRepeat: this.state.passwordRepeat
        };

        this.props.updateUser(user);

    }

    handleInputChange(e){

        this.setState({
            [e.target.name] : e.target.value
        });

    }

    render(){

        let isValid = this.isValid();

        return(
            <div className="app-margin--l">
                <h2 className="app-heading--secondary">Register</h2>
                <form>
                    <div className="app-margin--m">
                        <label>Username</label>
                        {this.props.user.username}
                    </div>

                    <div className="app-margin--m">
                        <label>First Name</label>
                        <input type="text" className="app-form-control app-margin--xs"
                               required
                               name="firstName"
                               value={this.state.firstName}
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

module.exports = Profile;
