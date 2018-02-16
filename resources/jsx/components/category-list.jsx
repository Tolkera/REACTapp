import React from 'react';
import Category from './category';
import {AddCategory, GetCategories, DeleteCategory, UpdateCategory} from '../services/category-service'

module.exports = class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newCategory: '',
            categories: []
        };

        this.addCategory = this.addCategory.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this)
    }

    componentDidMount(){
        GetCategories( ()=>{}, (categories) =>{
            this.setState({categories: categories})
        });
    }

    updateCategories(categories){
        this.setState({categories: categories})
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addCategory(e){
        e.preventDefault();
        let categoryData = {name: this.state.newCategory};
        AddCategory(categoryData, this.props.showNotification, (category)=>{

            let state = Object.assign({}, this.state);
            state.categories.push(category);

            this.setState({
                categories: state.categories,
                newCategory: ''
            })
        })
    }

    deleteCategory(id, index){
        DeleteCategory(id, this.props.showNotification, ()=>{

            let state = Object.assign({}, this.state);
            state.categories.splice(index, 1);

            this.setState({
                categories: state.categories
            })
        })
    }

    updateCategory(name, category, index){
        let categoryData = {name: name, _id: category._id};

        UpdateCategory(categoryData, this.props.showNotification, ()=>{

            let state = Object.assign({}, this.state);
            state.categories[index] = categoryData;

            this.setState({
                categories: state.categories
            })
        })
    }

    render(){
        let categories = this.state.categories.map((item, i)=>{

            let propMethods = {
                deleteCategory: this.deleteCategory,
                updateCategory: this.updateCategory,
                showNotification: this.props.showNotification
            };

            return(
                <Category data={item} key={i}
                          index={i}
                        {...propMethods}
                />
            )
        });

        return(
            <div className="app-container">
                <div className="app-categories">
                    <div className="app-grid">

                        <div className="app-grid__item app-grid__item--3-4 app-margin--xxl">
                            {categories}
                        </div>
                        <div className="app-grid__item app-grid__item--1-4 ">
                            <h4 className="app-heading--third app-margin--xxl ">Create a category</h4>
                            <form className="app-margin--m" >
                                <input required="required" className="app-form-control"
                                       value={this.state.newCategory}
                                       onChange={this.handleInputChange} name="newCategory"/>
                                <button onClick={this.addCategory}
                                        type="submit"
                                    disabled={!this.state.newCategory}
                                        className="app-btn app-btn--attention app-margin--s">Add</button>
                             </form>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
};
