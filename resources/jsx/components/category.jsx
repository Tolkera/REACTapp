import React from 'react';


module.exports = class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: this.props.data.name
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
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

    deleteCategory(e){
        e.preventDefault();
        this.props.deleteCategory(this.props.data._id, this.props.index);
    }

    updateCategory(e){
        e.preventDefault();
        this.props.updateCategory(this.state.name, this.props.data, this.props.index)
    }

    render(){

        return(

        <li className="app-category-item">
            <header className="app-editable">

                { this.state.isEditing ?
                    <form name="categoryEditForm" onSubmit={()=>{this.setState({editingCategory: false})}} className="app-margin--m">
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
        </li>
        )
    }
};
