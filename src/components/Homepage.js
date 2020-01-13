import React from 'react';
import NavButtons from './NavButtons';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.help = this.help.bind(this);
    }

    help(e) {
        e.preventDefault();
        window.location.href ="http://localhost:3000/help";
    }

    render() {
        return (
           <div id="homepageRoot">
                <NavBar page="home" title="Homepage title"/>
                <div id="homepageContainer">
                    <NavButtons />
                </div>
                <div id="textContainer">
                    <h1>Welcome to -title of website-!</h1>
                    <h3>A web app built using react.js</h3>
                    <h4>Confused?</h4>
                    <p>Get help <b style={{textDecoration: "underline", fontWeight: "normal", cursor: "pointer"}}onClick={this.help}>here</b></p>
                    <hr/>
                    
                </div>
               
               <Footer />
            </div>
        );
    }
}

export default HomePage;