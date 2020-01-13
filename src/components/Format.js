import React from "react";
import NavBar from "./NavBar";
import "../styles/format.css";

class Format extends React.Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.confirm = this.confirm.bind(this);
        this.copy = this.copy.bind(this);
        this.state = {
            other: false,
            list: ""
        };
    }

    changeHandler() {
        let value = document.getElementById("selectDelim").value;

        if (value === "other") {
            this.setState({ other: true });
        } else {
            this.setState({ other: false });
        }
    }

    confirm() {
        let list = document.getElementById("formatInput").value.trim();
        let value = document.getElementById("selectDelim").value;
        let chars = document.getElementById("otherInput").value;
        let tempList = [];

        if (list !== "") {
            if (value === "spaces") {
                tempList = list.split(" ").join(",");
            } else if (value === "colon") {
                tempList = list.split(":").join(",");
            } else if (value === "semicolon") {
                tempList = list.split(";").join(",");
            } else if (value === "other") {
                if (chars !== "") {
                    tempList = list.split(chars).join(",");
                }
            } else if (value === "column") {
                tempList = list.split("\n").join(",");
            } else if (value === "row") {
                tempList = list.split("\t").join(",");
            } else if (value === "rowCol") {
                let temp = list.split("\t");
                let temp2 = [];
                temp.forEach(element => {
                    if (!isAllWhitespace(element)) {
                        temp2.push(element);
                        console.log(element);
                    }
                });
                temp = temp2.join(",");

                let temp3 = [];
                temp3 = temp.split("\n");
                let temp4 = [];
                temp3.forEach(element => {
                    if (!isAllWhitespace(element)) {
                        temp4.push(element);
                        console.log(element);
                    }
                });
                temp = temp4.join(",");
                tempList = temp.split("\n").join(",");
            }
        }

        this.setState({ list: tempList });
    }

    copy() {
        let el = document.createElement("textarea");
        // Set value (string to be copied)

        el.value = this.state.list;

        // Set non-editable to avoid focus and move outside of view
        el.setAttribute("readonly", "");
        el.style = { position: "absolute", left: "-9999px" };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand("copy");
        // Remove temporary element
        document.body.removeChild(el);
    }

    render() {
        let otherInput = "other-false";
        if (this.state.other) {
            otherInput = "";
        }
        let newList = "";
        if (this.state.list.length > 1) {
            newList = (
                <div>
                    <div id="newList">
                        <p>Your new list is:</p>
                        <p>{this.state.list}</p>
                    </div>
                    <button onClick={this.copy}>Copy</button>
                </div>
            );
        }

        return (
            <div id="formatRoot">
                <NavBar title="Formatting List" page="format" />
                <h1 style={{ marginTop: "74px" }}>Copy and paste your list below</h1>
                <div id="formatContainer">
                    <textarea
                        id="formatInput"
                        style={{
                            height: "200px",
                            width: "100%",
                            padding: "10px",
                            outline: "none",
                            backgroundColor: "whitesmoke"
                        }}
                        name="textarea"
                        cols="30"
                        rows="5"
                    ></textarea>
                    <p style={{}}>What is your list separated by?</p>
                    <select onChange={this.changeHandler} id="selectDelim">
                        <option value="spaces">Spaces</option>
                        <option value="colon">Colon ":"</option>
                        <option value="semicolon">Semicolon ";"</option>
                        <option value="column">Columned (i.e. from Excel)</option>
                        <option value="row">Row Separated (i.e. from Excel)</option>
                        <option value="rowCol">Columns and Rows (i.e. from Excel)</option>
                        <option value="other">Other</option>
                    </select>
                    <div id="editingForm" className={otherInput}>
                        <div>
                            <label style={{ marginRight: "5px" }}>
                                <b>Enter the character(s) that your list is separated by:</b>
                            </label>
                            <br></br>
                            <br></br>
                            <input
                                id="otherInput"
                                type="text"
                                placeholder="Enter character(s) here..."
                                autoComplete="off"
                                name="psw"
                            />
                        </div>
                    </div>
                    <button style={{ marginTop: "5px", marginLeft: "5px", outline: "none" }} onClick={this.confirm}>
                        Format
                    </button>
                    {newList}
                </div>
            </div>
        );
    }
}

function isAllWhitespace(word) {
    for (var i = 0; i < word.length; i++) {
        var myCharCode = word.charCodeAt(i);

        if (!((myCharCode > 8 && myCharCode < 14) || myCharCode === 32)) {
            return false;
        }
        if (word === "") {
            return false;
        }
    }

    return true;
}

export default Format;
