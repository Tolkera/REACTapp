import React from 'react';
import moment from 'moment';

module.exports = class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: this.props.data.name,
            date: moment(this.props.data.created).format('DD MMM HH:mm')
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentWillReceiveProps(nextProps){
        if(this.props.data._id !== nextProps.data._id ||
            this.props.data.name !== nextProps.data.name){
            this.setState({isEditing: false})
        }
    }

    deleteTask(e){
        e.preventDefault();
        this.props.deleteTask(this.props.data._id, this.props.index);
    }

    updateTask(e){
        e.preventDefault();
        this.props.updateTask(this.state.name, this.props.data, this.props.index)
    }

    render(){

        return(
            <li className="app-task app-grid app-editable">
                <div className="app-grid__item--1-2">
                    {this.state.isEditing ?
                        <form className="app-margin--xs">
                                        <input value={this.state.name}
                                               onChange={this.handleInputChange}
                                               name="name" required="required"
                                               className="app-form-control" />
                                        <button onClick={this.updateTask}
                                                type="submit"
                                                disabled={!this.state.name}
                                                className="app-btn app-margin--s app-btn--neutral">
                                            Save
                                        </button>

                                    </form>
                        :
                        <span onClick={()=>{this.setState({isEditing: !this.state.isEditing})}} className="gm-task__name app-editable">
                        <span>    {this.props.data.name}</span>
                            <button className="app-margin--left app-edit">
                                <span className="fa fa-pencil"></span>
                            </button>
                        </span>
                    }
                </div>
                <div className=" app-grid__item--1-2 app-text-right app-edit">
                    <span className="app-task__created">Created on {this.state.date }</span>
                    <button onClick={this.deleteTask} className="app-btn--link">Delete</button>
                </div>
            </li>

    )}
};
