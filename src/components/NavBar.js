import React from "react";
import $ from "jquery";
import "../styles/navbar.css";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.back = this.back.bind(this);
        this.about = this.about.bind(this);
        this.help = this.help.bind(this);
        this.loadTwitter = this.loadTwitter.bind(this);
        this.loadLinkedin = this.loadLinkedin.bind(this);
        this.loadGithub = this.loadGithub.bind(this);
    }

    open() {
        $("#nav-icon1").toggleClass("open");
        $("#testMenu").toggleClass("show");
    }
    back() {
        if (this.props.title === "Formatting List") {
            window.location.href = "http://localhost:3000/teams";
        } else {
            window.location.href = "http://localhost:3000/";
        }
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

    about(e) {
        e.preventDefault();
        window.location.href = "http://localhost:3000/about";
    }

    help(e) {
        e.preventDefault();
        window.location.href = "http://localhost:3000/help";
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
        var backbutton = "";
        var smallBackButton = "";
        var menu = (
            <div id="testMenu" className="menu">
                <div id="aList">
                    <button type="button" className="link-button" onClick={this.about}>
                        About
                    </button>
                </div>
                <div id="aList">
                    <button type="button" className="link-button" onClick={this.help}>
                        Help
                    </button>
                </div>
                <div id="aList">
                    <button type="button" className="link-button" onClick={this.loadTwitter}>
                        Twitter
                    </button>
                </div>
                <div id="aList">
                    <button type="button" className="link-button" onClick={this.loadLinkedin}>
                        LinkedIn
                    </button>
                </div>
                <div id="aList">
                    <button type="button" className="link-button" onClick={this.loadGithub}>
                        GitHub
                    </button>
                </div>
            </div>
        );
        if (this.props.page !== "home" && this.props.page !== "format") {
            /*
            backbutton = <button style={{
                left: "0",
                display: "inline",
                position: "absolute",
                cursor: "pointer",
                margin: "12px",
                verticalAlign: "middle"
            }} onClick={this.back} height="40px">Back</button>
            */
            let backSymbol = "<";

            smallBackButton = (
                <button id="backButtonSmall" onClick={this.back}>
                    {backSymbol}
                </button>
            );
            backbutton = (
                <div className="container">
                    <div className="center">
                        <button className="btn" onClick={this.back}>
                            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                            </svg>
                            <span>Home</span>
                        </button>
                    </div>
                </div>
            );
        } else if (this.props.page === "format") {
            let backSymbol = "<";
            smallBackButton = (
                <button id="backButtonSmall" onClick={this.back} height="40px">
                    {backSymbol}
                </button>
            );
            backbutton = (
                <div className="container">
                    <div className="center">
                        <button className="btn" onClick={this.back}>
                            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                            </svg>
                            <span>Back</span>
                        </button>
                    </div>
                </div>
            );
        }
        if (this.props.page === "About") {
            menu = (
                <div id="testMenu" className="menu">
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.back}>
                            Home
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.help}>
                            Help
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.loadTwitter}>
                            Twitter
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.loadLinkedin}>
                            LinkedIn
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.loadGithub}>
                            GitHub
                        </button>
                    </div>
                </div>
            );
        } else if (this.props.page === "Help") {
            menu = (
                <div id="testMenu" className="menu">
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.back}>
                            Home
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.about}>
                            About
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.loadTwitter}>
                            Twitter
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.loadLinkedin}>
                            LinkedIn
                        </button>
                    </div>
                    <div id="aList">
                        <button type="button" className="link-button" onClick={this.loadGithub}>
                            GitHub
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <header id="navBar">
                {backbutton}
                {smallBackButton}
                <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                    <h1
                        style={{
                            marginTop: "auto",
                            lineHeight: "64px",
                            fontFamily: "'Quicksand', sans-serif",
                            textShadow: "1px 1px black"
                        }}
                    >
                        {this.props.title}
                    </h1>
                </div>
                <div style={{ position: "absolute", top: "10px", right: "10px" }} id="nav-icon1" onClick={this.open}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {menu}
            </header>
        );
    }
}

$(document).ready(function() {
    window.onclick = function(e) {
        if (
            !e.target.matches("#testMenu") &&
            !e.target.matches("a") &&
            !e.target.matches("span") &&
            !e.target.matches("#nav-icon1") &&
            !e.target.matches("#aList") &&
            !e.target.matches(".link-button")
        ) {
            var myDropdown = document.getElementById("testMenu");
            if (myDropdown.classList.contains("show")) {
                myDropdown.classList.remove("show");
                $("#nav-icon1").toggleClass("open");
            }
        }
    };
});

export default NavBar;
