import React from 'react';
import '../styles/footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.loadGithub = this.loadGithub.bind(this);
        this.loadLinkedin = this.loadLinkedin.bind(this);
        this.loadTwitter = this.loadTwitter.bind(this);
    }

    loadGithub() {
        window.open("https://github.com/jwieler");
    }

    loadTwitter() {
        window.open("https://twitter.com/jakewieler21");
    }

    loadLinkedin() {
        window.open("https://www.linkedin.com/in/jacob-wieler-95299519a/");
    }
    
    render() {
        return (
            <div id="footer">
                <h3>Check me out!</h3>
                <img onClick={this.loadTwitter} id="twitter" src={require("../img/twitter.png")} alt="Twitter logo"/>
                <img onClick={this.loadGithub} id="github" src={require("../img/github.png")} alt="github logo"/>
                <img onClick={this.loadLinkedin} id="linkedin" src={require("../img/linkedin.png")} alt="linkedin logo"/>
            </div>
        )
    }
}

export default Footer;