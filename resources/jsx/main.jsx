import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/router';
import About from './components/about';

class Main extends React.Component {

    render() {
        return (
            <div>
                <AppRouter />
                <About />
            </div>
        );
    }
}

ReactDOM.render(<Main  />, document.getElementById('js-app'));
