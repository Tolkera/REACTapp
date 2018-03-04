import React from 'react';
import Task from './task';
import { AddTask, DeleteTask, UpdateTask } from '../services/task-service';


module.exports = class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: this.props.data.name,
            newTaskName: '',
            tasks: this.props.data.tasks
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.addTask = this.addTask.bind(this);
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
        this.setState({isEditing: false})
    }

    deleteCategory(e){
        e.preventDefault();
        this.props.deleteCategory(this.props.data._id, this.props.index);
    }

    updateCategory(e){
        e.preventDefault();
        this.props.updateCategory(this.state.name, this.props.data, this.props.index)
    }

    addTask(e){
        e.preventDefault();
        let categoryData = {name: this.state.newTaskName, categoryId: this.props.data._id};
        AddTask(categoryData, this.props.showNotification, (task)=>{

            let state = Object.assign({}, this.state);
            state.tasks.push(task);

            this.setState({
                tasks: state.tasks,
                newTaskName: '',
                isAddingTask: false
            })
        })
    }

    deleteTask(id, index){
        DeleteTask(id, this.props.showNotification, ()=>{

            let state = Object.assign({}, this.state);
            state.tasks.splice(index, 1);

            this.setState({
                tasks: state.tasks
            })
        })
    }

    updateTask(name, task, index){
        let taskData = {name: name, _id: task._id};

        UpdateTask(taskData, this.props.showNotification, ()=>{

            let state = Object.assign({}, this.state);
            state.tasks[index] = taskData;

            this.setState({
                tasks: state.tasks
            })
        })
    }


    render(){

        let tasks = this.state.tasks.map((item, i)=>{

            let propMethods = {
                deleteTask: this.deleteTask,
                updateTask: this.updateTask,
                showNotification: this.props.showNotification
            };

            return(
                <Task data={item}
                            key={item._id}
                            index={i}
                    {...propMethods}
                />
            )
        });

        return(

        <li className="app-category-item">
            <header className="app-editable">

                { this.state.isEditing ?
                    <form name="categoryEditForm" onSubmit={()=>{this.setState({isEditing: false})}} className="app-margin--m">
                        <input
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            name="name"
                            required="required"
                            className="app-form-control" />
                        <button
                            onClick={this.updateCategory}
                            type="submit"
                            disabled={!this.state.name}
                            className="app-btn app-btn--neutral app-margin--xs">Save</button>
                        <button
                            onClick={this.deleteCategory}
                            className="app-btn--link app-margin--left">Delete</button>

                    </form>
                        :

                    <h4  className="app-heading--third" onClick={()=> this.setState({isEditing: !this.state.isEditing})}>
                        {this.props.data.name}
                        <span className="app-edit fa fa-pencil"></span>
                    </h4>
                    }

            </header>
            <ul className="app-margin--m">
                {tasks}
            </ul>

            <div className="app-margin--s">

                    { this.state.isAddingTask ?
                        <form name="addTaskForm" className="gm-add-task-form form-inline">
                                <div className="form-group">
                                    <input
                                        value={this.state.newTaskName}
                                        onChange={this.handleInputChange}
                                        name="newTaskName" required className="app-form-control" />
                                </div>
                                <div className="form-group">
                                    <button onClick={this.addTask}
                                            disabled={ !this.state.newTaskName }
                                            className="app-btn app-btn--neutral app-margin--s">Add task</button>
                                    <span onClick={()=>{this.setState({isAddingTask: false})}} className="app-margin--left app-btn-link app-btn app-margin--s">Cancel</span>
                                </div>
                            </form>
                        :
                        <button className="btn">
                            <span onClick={()=>{this.setState({isAddingTask: !this.state.isAddingTask})}}
                               className="fa fa-plus app-margin--m app-add-task__trigger"></span>
                        </button>

                    }
                        </div>
        </li>
        )
    }
};
