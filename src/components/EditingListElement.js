import React from "react";
import "../styles/editinglistelement.css";
class EditingListElement extends React.Component {
    constructor(props) {
        super(props);

        this.editKeyDownHandler = this.editKeyDownHandler.bind(this);
    }

    editKeyDownHandler() {}

    render() {
        return (
            <li id={this.props.id} className="story">
                <div id="editingListElement">
                    <div id="editingListElementContainer">
                        <div>
                            <label>
                                <b>Current Name:</b>
                            </label>
                            <b id={"editingNamesIndex" + this.props.num[1]}> {this.props.num[0]}</b>
                            <br></br>

                            <label style={{ marginRight: "5px" }}>
                                <b>New Name:</b>
                            </label>
                            <input
                                id={"nameInputEditListIndex" + this.props.num[1]}
                                type="text"
                                placeholder="Enter New Name"
                                autoComplete="off"
                                name="psw"
                                className="editing-list-input"
                                onKeyDown={this.editKeyDownHandler}
                            />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                </div>
            </li>
        );
    }
}

export default EditingListElement;
