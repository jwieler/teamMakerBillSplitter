import React from 'react';
import '../styles/teamlistelement.css';


class TeamListElement extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
    }
    
    state = {
        clicked: false,
    };
    
    clickHandle() {
        if(!this.state.clicked && this.props.num[1])
        {
            this.setState({clicked: true});
        }
        else
        {
            this.setState({clicked: false});
        }
    }

    render() {
        var teamStyle = "";
        var indent = "";
        var child = "";
        var pColor = "Whitesmoke";
        var pBackground = "Transparent";

        //TODO: make it so that someone can edit the team names after the teams have been created
        //also: eliminate bug where if user's name contains "Team" it will show up as a Team header and not a name in the list
        //possibility: use password attached to team name in array to identify what is a team name and not a person name
        //downside: open up to possibility of someone entering in password unexpectedly (imporbable but possible)
        //2nd possibility: use a '#' symbol ("Team # 1") and prevent users from entering a '#' into the name of a person
        //downsides: limit user input, however, a name should not have a # anyways also prevents users from making groups of other
        //datasets like hashtags or phone numbers with that symbol used
    // console.log(this.props.num);
        if(this.props.num[1])
        {
            teamStyle = "bold";
            indent = "";
            child = "";
        }
        else
        {
            teamStyle = "";
            indent = "indent";
            child = "- ";
        }
        return (
            <li id={this.props.id} className={"story"}>
                <div>
                    <p style={{color: pColor, backgroundColor: pBackground, width: "fit-content", paddingLeft: "5px", paddingRight: "5px"}} className={indent + " " + teamStyle} onClick={this.clickHandle}>{child + this.props.num[0]}</p>
                </div>
            </li>
        );
    }
}

export default TeamListElement;