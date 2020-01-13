import React from 'react';
import NavBar from './NavBar';
import '../styles/notfound.css';
class NavButton extends React.Component {
    render() {
        return (
            <div id="notFound">
                <NavBar/>
                <h1>Sorry, page not found</h1>
            </div>
        );
    }
}

export default NavButton;