import React from 'react';

import { ToastContainer } from "react-toastr";

let container;

module.exports = class Login extends React.Component {


    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps){

        let attrs = {closeButton: true};

        let {id, type, texts, code} = nextProps.data;
        if (id !== this.props.data.id) {
            switch(type) {
                case 'success':
                    container.success(texts.text, texts.heading, attrs);
                    break;
                case 'error':
                    container.error(texts.text, 'Hmmmm...', attrs);
            }
        }
    }

    render(){

        return(
            <div>
                <ToastContainer
                    ref={ref => container = ref}
                    className="toast-top-right"
                />

            </div>
        )
    }
};
