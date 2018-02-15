import React from 'react';
import { Link} from 'react-router-dom';


module.exports = class NotFound extends React.Component {

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this), false)
    }


    handleMouseMove(e){
        let settings = {
            mouseSpeed: 30
        };

        var pageX = e.pageX;
        var pageY = e.pageY;
        this.px.style.left = pageX/settings.mouseSpeed + 'px';
        this.px.style.top = pageY/(settings.mouseSpeed) + 'px';
    }

    componentWillUnmount(){
        window.removeEventListener("mousemove", this.handleMouseMove, false);

    }


    render(){

        return(
            <div className="app-not-found">

                <div className="app-container">
                    <div>
                        <h1 className="app-heading--primary"> 404</h1>
                    </div>
                    <div className="app-not-found__nav">
                        <Link className="app-link"  to="/">Home</Link>

                    </div>
                </div>


                <div className="app-not-found__parallax-wrap">
                    <div className="app-not-found__parallax js-parallax" ref={(px) => { this.px = px; }}>
                        <img src="images/bosch.png" />
                    </div>
                </div>
            </div>

        )
    }
};
