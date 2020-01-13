import React from "react";
import TeamListElement from "./TeamListElement";
import "../styles/teamlist.css";

const listStyle = {
    listStyle: "none"
};

class TeamList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyList: []
        };
    }

    componentDidUpdate(prevProps) {
        var index = 1;
        //console.log("array is: " + this.props.array)
        if (prevProps.array !== this.props.array) {
            this.setState({
                storyList: this.props.array.map(
                    e => <TeamListElement num={e} id={"listEl" + e} key={e + Math.random()} />,
                    index++
                )
            });
        }
    }

    render() {
        var test = this.props.array.map(
            e => <TeamListElement num={e} id={"listEl" + e} key={e + Math.random()} />,
            <br></br>
        );

        var showbox = "";

        if (test.length !== 0) {
            showbox = "showBox";
        }

        return (
            <div id="teamList" className={showbox}>
                <ul id="teamsList" style={listStyle}>
                    {test}
                </ul>
            </div>
        );
    }
}

export default TeamList;
