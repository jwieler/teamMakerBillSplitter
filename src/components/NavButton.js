import React from 'react';
import '../styles/navbutton.css';

class NavButton extends React.Component {
    render() {
        return <button id="navButton" style={{padding: "5px", marginLeft: this.props.margin}} onClick={this.props.onClick}>{this.props.text}</button>;
    }
}

export default NavButton;