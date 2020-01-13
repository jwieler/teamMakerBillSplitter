import React from "react";
import { render } from "react-dom";
import HomePage from "./Homepage";
import List from "./List";
import RangeSlider from "./RangeSlider";
import TeamList from "./TeamList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import EditingList from "./EditingList";
import $ from "jquery";
import "../styles/teams.css";
import { useParams } from "react-router-dom";

const INITIAL_STATE = {
    namesList: [],
    removing: [],
    editingTeamNames: []
};

var teams = [];
var teamList = [];
var collapseState = "Collapse List";
var editingWord = "";
var editingIndex = -1;
var trueIndex = -1;
var warning = "warning";
var collapseTeamListText = "Collapse List";
var teamsListIsPresent = false;

class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.addName = this.addName.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.makeTeams = this.makeTeams.bind(this);
        this.removeName = this.removeName.bind(this);
        this.clear = this.clear.bind(this);
        this.addListOfNames = this.addListOfNames.bind(this);
        this.collapse = this.collapse.bind(this);
        this.setScroll = this.setScroll.bind(this);
        this.editName = this.editName.bind(this);
        this.editConfirm = this.editConfirm.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.editKeyDownHandler = this.editKeyDownHandler.bind(this);
        this.loadFormat = this.loadFormat.bind(this);
        this.closeWarning = this.closeWarning.bind(this);
        this.editTeamNames = this.editTeamNames.bind(this);
        this.editTeamNamesConfirm = this.editTeamNamesConfirm.bind(this);
        this.collapseTeamList = this.collapseTeamList.bind(this);
        this.clearTeamList = this.clearTeamList.bind(this);
        this.export = this.export.bind(this);

        this.state = INITIAL_STATE;
    }

    back() {
        teamList = [];
        render(<HomePage />, document.getElementById("root"));
    }

    addName() {
        if (
            !isAllWhitespace(document.getElementById("nameInput").value) &&
            document.getElementById("nameInput").value !== ""
        ) {
            let temp = [...this.state.namesList];
            temp.push(document.getElementById("nameInput").value);
            this.setState({ namesList: temp }, this.setScroll);
            document.getElementById("nameInput").value = "";
        }
    }

    setScroll() {
        setTimeout(function() {
            document.getElementById("nameListContainer").scrollTop = document.getElementById(
                "nameListContainer"
            ).scrollHeight;
        }, 0);
        //document.getElementById('nameListContainer').scrollTop = document.getElementById('nameListContainer').scrollHeight;
    }

    keyDownHandler(e) {
        if (e.keyCode === 13 && !isAllWhitespace(document.getElementById("nameInput").value)) {
            let temp = [...this.state.namesList];
            temp.push(document.getElementById("nameInput").value);
            this.setState({ namesList: temp }, this.setScroll);
            /*
           
            setTimeout(function(){  document.getElementById('nameListContainer').scrollTop = document.getElementById('nameListContainer').scrollHeight + 36; }, 50);
           */
            document.getElementById("nameInput").value = "";
        }
    }

    makeTeams() {
        let numTeams = document.getElementById("myRange").value;
        teamList = [];
        if (numTeams > this.state.namesList.length) {
            alert("Cannot have more teams than people...");
        } else if (numTeams === "") {
            alert("Please enter in a number of teams");
        } else if (parseInt(numTeams) > 0) {
            //console.log("Make the teams here...");
            //console.log(this.state.namesList);
            let temp = [...this.state.namesList];
            shuffle(temp);
            //console.log(temp);
            teams = [...temp];
            let list = document.getElementById("nameList").getElementsByTagName("li");
            let length = list.length;
            let bestTeams = [];
            bestTeams = getBestTeams(length, numTeams);
            let k = 0;
            for (let i = 0; i < numTeams; i++) {
                let tempTeam = ["Team " + (i + 1), true];
                teamList.push(tempTeam);
                for (let j = 0; j < bestTeams[i]; j++) {
                    tempTeam = [teams[k], false];
                    teamList.push(tempTeam);
                    k++;
                }
            }
            teamsListIsPresent = true;
            this.setState({ namesList: this.state.namesList, editingTeamNames: [] });
            $("#editTeamNameConfirm").addClass("editTeamNameConfirmButton");

            // console.log(test);
            //  console.log(teamList);
        }
    }

    removeName() {
        let list = document.getElementById("nameList").getElementsByTagName("li");
        let length = list.length;
        let temp = [...this.state.namesList];
        let badIndecies = [];
        for (let i = 0; i < length; i++) {
            let pTag = list[i].getElementsByTagName("p")[0];
            let color = pTag.style.color;
            let name = pTag.innerHTML;

            if (color === "lightblue") {
                if (name.includes("&amp;")) {
                    name = name.split("&amp;").join("&");
                }
                let index = temp.indexOf(name);
                if (!checkIfArrayIsUnique(temp)) {
                    index = i;
                }

                if (index === editingIndex) {
                    document.getElementById("nameInputEdit").value = "";
                    $("#editingForm").addClass("editing");
                }
                /*
                if(temp[index] === editingWord)
                {
                    document.getElementById('nameInputEdit').value = "";
                    $('#editingForm').addClass('editing');    
                }
                */

                temp = temp.slice(0, index).concat(temp.slice(index + 1, temp.length));

                badIndecies.push(index);
            }
        }

        if (trueIndex !== -1) {
            trueIndex -= badIndecies.length;
            editingIndex = trueIndex;
        }
        //editingIndex = temp.indexOf(editingWord);
        if (temp.length < 4 && $("#nameListContainer").hasClass("collapsed")) {
            this.collapse();
        }
        this.setState({ namesList: temp, removing: badIndecies });
    }

    clear() {
        let list = document.getElementById("nameList").getElementsByTagName("li");
        let length = list.length;
        if (length > 0) {
            let test = window.confirm("Are you sure you want to clear the list?");
            if (test) {
                let temp = [];
                if ($("#nameListContainer").hasClass("collapsed")) {
                    collapseState = "Collapse List";
                    $("#nameListContainer").toggleClass("collapsed");
                }
                document.getElementById("nameInputEdit").value = "";
                $("#editingForm").addClass("editing");
                this.setState({ namesList: temp });
            }
        }
    }

    addListOfNames() {
        let input = document.getElementById("listInput").value;

        /*
        if (!checkListInput(input)) {
            $("#warningP").removeClass("warning");
            $("#closeWarning").removeClass("warning");
            return;
        }
        */
        let list = document.getElementById("listInput").value.split(",");
        if (list.length < 2) {
            return;
        }
        let temp = [...this.state.namesList];
        list.forEach(element => {
            if (!isAllWhitespace(element)) {
                temp.push(element);
            }
        });
        this.setState({ namesList: temp }, this.setScroll);
        document.getElementById("listInput").value = "";
    }

    collapse() {
        let list = document.getElementById("nameList").getElementsByTagName("li");
        let length = list.length;
        if (length < 4) {
            return;
        }
        $("#nameListContainer").toggleClass("collapsed");
        if (collapseState === "Collapse List") {
            collapseState = "Expand List";
        } else {
            collapseState = "Collapse List";
        }
        this.setState({ namesList: this.state.namesList }, this.setScroll);
    }

    editName() {
        let list = document.getElementById("nameList").getElementsByTagName("li");
        let length = list.length;
        let temp = [...this.state.namesList];
        let badIndecies = [];
        let flag = false;
        let index = -1;

        for (let i = 0; i < length; i++) {
            let pTag = list[i].getElementsByTagName("p")[0];
            let color = pTag.style.color;

            if (color === "lightblue" && !flag) {
                // index = temp.indexOf(name);
                index = i;
                editingIndex = index;
                //temp = temp.slice(0, index).concat(temp.slice(index + 1, temp.length));
                badIndecies.push(index);
                flag = true;
            } else if (color === "lightblue" && flag) {
                alert("You can only edit one name at a time");
                return;
            }
        }
        /*
        if(!checkIfArrayIsUnique(temp))
        {
            
            var duplicates = [];
            for(var j = 0; j < length; j++)
            {
                for(var k = 0; k < length; k++)
                {
                    if(temp[j] === temp[k] && !duplicates.includes(temp[j]) && j !== k)
                    {
                        duplicates.push(temp[j]);
                    }
                }
            }
            
            trueIndex = index;
        }
*/
        trueIndex = index;
        if (index !== -1) {
            let currentName = temp[index];
            editingWord = currentName;
            $("#editingForm").removeClass("editing");
        }
        this.setState({ namesList: temp, removing: badIndecies });
    }

    editConfirm() {
        let edit = document.getElementById("nameInputEdit").value;
        if (isAllWhitespace(edit) || edit === "") {
            return;
        }
        let temp = [...this.state.namesList];
        let index = editingIndex;
        temp[index] = edit;
        document.getElementById("nameInputEdit").value = "";
        this.setState({ namesList: temp });
        $("#editingForm").addClass("editing");
    }

    closeEdit() {
        $("#editingForm").addClass("editing");
        document.getElementById("nameInputEdit").value = "";
        this.setState({ namesList: this.state.namesList });
    }

    editKeyDownHandler(e) {
        if (e.keyCode === 13 && !isAllWhitespace(document.getElementById("nameInputEdit").value)) {
            let edit = document.getElementById("nameInputEdit").value;
            let temp = [...this.state.namesList];
            let index = editingIndex;
            temp[index] = edit;
            document.getElementById("nameInputEdit").value = "";
            this.setState({ namesList: temp });
            $("#editingForm").addClass("editing");
        }
    }

    loadFormat() {
        //TODO: create a formatting component to format lists that are separated by different delimieters and such

        window.location.href = "http://localhost:3000/format";
    }

    closeWarning() {
        $("#warningP").addClass("warning");
        $("#closeWarning").addClass("warning");
    }

    editTeamNames() {
        let list = document.getElementById("teamsList").getElementsByTagName("li");
        let length = list.length;
        let temp = [];
        for (let i = 0; i < length; i++) {
            let pTag = list[i].getElementsByTagName("p")[0];
            if (pTag.classList.contains("bold")) {
                let toPush = [pTag.innerHTML, i];
                temp.push(toPush);
            }
        }
        $("#editTeamNameConfirm").removeClass("editTeamNameConfirmButton");
        this.setState({ editingTeamNames: temp });
    }

    editTeamNamesConfirm() {
        let list = document.getElementById("editingList").getElementsByTagName("li");
        let length = list.length;
        let temp = [];
        temp = [...this.state.editingTeamNames];
        //  console.log(temp);
        for (let i = 0; i < length; i++) {
            let index = list[i].getElementsByTagName("b")[1].id;
            index = index.split("editingNamesIndex")[1];
            let newName = document.getElementById("nameInputEditListIndex" + index).value;
            if (newName !== "" && !isAllWhitespace(newName)) {
                let intIndex = parseInt(index);
                let toSet = [newName, true];

                teamList[intIndex] = toSet;
                temp[i] = newName;
            }
        }

        this.setState({ editingTeamNames: [] });
        $("#editTeamNameConfirm").addClass("editTeamNameConfirmButton");
    }
    checkParam() {
        const { reset } = useParams();
        return reset;
    }

    clearTeamList() {
        teamList = [];
        this.setState({ editingTeamNames: this.state.editingTeamNames });
    }

    collapseTeamList() {
        if (teamList.length >= 4) {
            if ($("#teamList").hasClass("collapsed")) {
                collapseTeamListText = "Collapse List";
            } else {
                collapseTeamListText = "Expand List";
            }
            $("#teamList").toggleClass("collapsed");
        }

        this.setState({ editingTeamNames: this.state.editingTeamNames });
    }

    export() {
        //TO DO: use express.js and node to create a server to allow files to be uploaded and then downloaded by the user
        //follow: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

        // Create new element
        let el = document.createElement("textarea");
        // Set value (string to be copied)

        for (let i = 0; i < teamList.length; i++) {
            let temp = teamList[i][0];
            //TODO: format the list that is copied so that it looks nice
            if (teamList[i][1]) {
                el.value += temp + ": ";
            } else if (i < teamList.length - 1 && teamList[i + 1][1]) {
                el.value += temp + " \n\n";
            } else if (i === teamList.length - 1) {
                el.value += temp;
            } else {
                el.value += temp + ", ";
            }
        }

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
        let specials = '!"#$%&()*+-/:;<=>?@[\\]^_`{|}~';
        let nameListBox = "";
        let editTeamName = "teamNameEdit";
        let display = "none";
        if (this.state.namesList.length > 0) {
            nameListBox = "showBox";
        }
        if (teamList.length < 1) {
            teamsListIsPresent = false;
        }
        if (teamsListIsPresent) {
            editTeamName = "";
        }
        if (teamList.length > 0) {
            $("#collapseTeamList").removeClass("collapseTeamList");
            $("#clearTeamList").removeClass("collapseTeamList");
            display = "inline";
        } else {
            $("#collapseTeamList").addClass("collapseTeamList");
            $("#clearTeamList").addClass("collapseTeamList");
        }
        return (
            <div id="teamsRoot">
                <NavBar title="Team Maker" />
                <div id="teamOuterContainer">
                    <div id="teamContainer">
                        <p>Copy and paste a list of names (separated by commas) into the box below</p>
                        <div>
                            <textarea
                                id="listInput"
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "whitesmoke",
                                    outline: "none"
                                }}
                                name="textarea"
                            ></textarea>
                        </div>
                        <button style={{ padding: "5px" }} onClick={this.addListOfNames}>
                            Add Names
                        </button>
                        <p style={{ color: "tomato" }} id="warningP" className={warning}>
                            Warning: List cannot contain any of the following: {specials}
                        </p>
                        <button
                            id="closeWarning"
                            style={{ padding: "5px" }}
                            className={warning}
                            onClick={this.closeWarning}
                        >
                            Ok
                        </button>
                        <p>
                            List formatted differently? Format your list{" "}
                            <b style={{ cursor: "pointer" }} onClick={this.loadFormat}>
                                here
                            </b>
                        </p>
                        <p>Or, add names one by one below.</p>
                        <input
                            id="nameInput"
                            type="text"
                            placeholder="Enter a name..."
                            autoComplete="off"
                            onKeyDown={this.keyDownHandler}
                        ></input>
                        <button style={{ padding: "5px", marginLeft: "5px" }} onClick={this.addName}>
                            Add Name
                        </button>
                        <button id="collapseBtn" style={{ padding: "5px", marginLeft: "5px" }} onClick={this.collapse}>
                            {collapseState}
                        </button>
                        <p>Your Names:</p>
                        <div id="nameListContainer" className={nameListBox}>
                            <List id="nameList" array={this.state.namesList} removing={this.state.removing}></List>
                        </div>
                        <button style={{ padding: "5px" }} onClick={this.removeName}>
                            Remove Name(s)
                        </button>
                        <button style={{ padding: "5px", marginLeft: "5px" }} onClick={this.editName}>
                            Edit Name
                        </button>
                        <button style={{ padding: "5px", marginLeft: "5px" }} onClick={this.clear}>
                            Clear List
                        </button>
                        <div id="editingForm" className="editing">
                            <div>
                                <label>
                                    <b>Current Name:</b>
                                </label>
                                <b> {editingWord}</b>
                                <br></br>
                                <br></br>
                                <label style={{ marginRight: "5px" }}>
                                    <b>New Name:</b>
                                </label>
                                <input
                                    id="nameInputEdit"
                                    type="text"
                                    placeholder="Enter New Name"
                                    autoComplete="off"
                                    name="psw"
                                    onKeyDown={this.editKeyDownHandler}
                                />
                                <button
                                    style={{ padding: "5px", marginLeft: "5px" }}
                                    type="submit"
                                    onClick={this.editConfirm}
                                >
                                    Confirm
                                </button>
                                <button
                                    style={{ padding: "5px", marginLeft: "5px" }}
                                    type="button"
                                    onClick={this.closeEdit}
                                >
                                    Close
                                </button>
                            </div>
                            <hr />
                        </div>
                        <p>Number of people: {this.state.namesList.length}</p>
                        <hr />
                        <p>How many teams?</p>
                        <RangeSlider max={this.state.namesList.length} />
                        <button id="makeTeams" style={{ margingTop: "5px" }} onClick={this.makeTeams}>
                            Make Teams
                        </button>
                        <button
                            id="collapseTeamList"
                            className="collapseTeamList"
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                            onClick={this.collapseTeamList}
                        >
                            {collapseTeamListText}
                        </button>
                        <button
                            id="clearTeamList"
                            className="collapseTeamList"
                            style={{ marginTop: "5px", marginLeft: "5px" }}
                            onClick={this.clearTeamList}
                        >
                            Clear List
                        </button>
                        <TeamList id="teamsList" array={teamList} />
                        <button id="export" style={{ display: display }} onClick={this.export}>
                            Export List
                        </button>
                        <div id="editTeamNameContainer">
                            <button style={{ padding: "5px" }} className={editTeamName} onClick={this.editTeamNames}>
                                Edit Team Names
                            </button>
                            <EditingList array={this.state.editingTeamNames}></EditingList>
                            <button
                                id="editTeamNameConfirm"
                                style={{ padding: "5px" }}
                                className={"editTeamNameConfirmButton"}
                                onClick={this.editTeamNamesConfirm}
                            >
                                Confirm Edits
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                </div>

                <Footer />
            </div>
        );
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

//algorithm to find the best team splits
//uses the floor of numPeople/numTeams to find the most people that can evenly go into the number of teams desired
//then adds one to some teams (found by subtracting the people that evenly went into the teams from the total number of people)
//until there is no one not on a team
//max differnce between any two teams will be 1
function getBestTeams(numPeople, numTeams) {
    var array = [];
    var pplPer = Math.floor(parseFloat(numPeople) / numTeams);
    var teamsToAddTo = numPeople - pplPer * numTeams;
    for (var i = 0; i < numTeams; i++) {
        array[i] = pplPer;
    }
    for (var j = 0; j < teamsToAddTo; j++) {
        array[j] += 1;
    }
    return array;
}

function isAllWhitespace(word) {
    for (var i = 0; i < word.length; i++) {
        var myCharCode = word.charCodeAt(i);

        if (!((myCharCode > 8 && myCharCode < 14) || myCharCode === 32)) {
            return false;
        }
    }

    return true;
}

function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
}

export default Teams;
