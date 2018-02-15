import React from 'react';
import Category from './category'


module.exports = class Tasks extends React.Component {


    render(){
        console.log('tasks',this.props)


        let categories = this.props.user.categories.map((item, i)=>{

            return(
                <div>item.name</div>
            )
        })


        return(
            <div class="app-container">
                <div class="app-categories">
                    <div class="app-grid">
                        <div class="app-grid__item app-grid__item--3-4 app-margin--xxl">
                            {categories}
                        </div>
                    </div>
                </div>
            </div>


        )
    }
};
