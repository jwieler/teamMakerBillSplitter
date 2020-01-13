import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/about.css';

class About extends React.Component {
    render() {
        return (
            <div id="aboutRoot">
                <NavBar title="About" page="About"/>
                <div id="aboutContainer">
                    <h2>Author: Jacob Wieler</h2>
                    <img src={require('../img/jacob1.JPG')}alt="beegYoshiSpin"/>
                    <p>Hi! My name is Jacob Wieler and I am a Software Engineering student at the University of Guelph.
                        This project is just for fun to practice my skills with JavaScript and react.js. Feel free to click the links
                        at the bottom of the page (or in the menu) to visit my Twitter, GitHub, and LinkedIn.
                    </p>
                    <p>If you are confused and don't know how to use the site, click the menu button in the top right, and select the
                        help link to learn about how to use the different parts of the site.
                    </p>
                    <hr></hr>
                </div>
           
                <Footer/>
            </div>
        )
    }
}

export default About;