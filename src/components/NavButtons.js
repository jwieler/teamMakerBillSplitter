import React from 'react';
import NavButton from './NavButton';

class NavButtons extends React.Component {
    constructor(props) {
        super(props);

        this.bill = this.bill.bind(this);
        this.teams = this.teams.bind(this);
    }

    bill() {
        window.location.href ="http://localhost:3000/bill";
    }

    teams() {
        window.location.href ="http://localhost:3000/teams";
    }

    render() {  
        return (
            <div style = {{ 
                textAlign: "center",
                padding: "10px",
            }}>
                <NavButton onClick={this.bill} text="Bill Splitter"/>
                <NavButton onClick={this.teams} text="Team Maker" margin="5px"/>
            </div>
        );
    }
}

export default NavButtons;