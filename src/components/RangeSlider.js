import React from "react";
import "../styles/rangeslider.css";

class RangeSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.handelKey = this.handelKey.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //default value for the slider
    state = {
        value: 1
    };

    handelKey(e) {
        e.preventDefault();
    }
    //changes where the slider is located on the bar and changes the value text
    handleInput(e) {
        this.setState({ value: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="slidecontainer">
                <input
                    className="number-input"
                    type="number"
                    min="1"
                    max={this.props.max}
                    value={this.state.value}
                    onChange={this.handleInput}
                    onKeyDown={this.handelKey}
                    id="myRange"
                    style={{ textShadow: "0 0 0 #2196f3" }}
                    onClick={this.handleClick}
                ></input>
            </div>
        );
    }
}

export default RangeSlider;
