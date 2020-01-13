import React from "react";
import "../styles/listElement.css";

var pColor = "WhiteSmoke";
var pBackground = "transparent";

class ListElement extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
    }

    state = {
        clicked: false
    };

    clickHandle() {
        if (this.state.clicked === false) {
            pColor = "lightBlue";
            this.setState({ clicked: true });
        } else {
            pColor = "WhiteSmoke";
            this.setState({ clicked: false });
        }
    }

    updateClicked() {}

    render() {
        if (this.state.clicked) {
            pColor = "lightblue";
            // pBackground = "whitesmoke";
        } else {
            pColor = "WhiteSmoke";
            pBackground = "transparent";
        }
        return (
            <li id={this.props.id} className="story">
                <div id="listElement">
                    <p
                        onClick={this.clickHandle}
                        style={{
                            color: pColor,
                            cursor: "pointer",
                            backgroundColor: pBackground,
                            width: "fit-content",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            marginLeft: "5px"
                        }}
                    >
                        {this.props.num}
                    </p>
                </div>
            </li>
        );
    }
}

export default ListElement;
