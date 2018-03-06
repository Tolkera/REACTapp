import React from 'react';

module.exports = class About extends React.Component {

    render(){

        return(
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

        )
    }
};
