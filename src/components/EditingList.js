import React from 'react';
import EditingListElement from './EditingListElement';

const listStyle = {
    listStyle: 'none'
};


class EditingList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyList: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.array !== this.props.array) {
            this.setState({
                storyList: this.props.array.map((e) =>
                    <EditingListElement num={e} id={"editListEl" + e} key={e + Math.random()}/>,
                )
            });
        }
    }
    
    render() {
        var test =  this.props.array.map((e) =>
        <EditingListElement num={e} id={"listEl" + e} key={e + Math.random()}/>,
        <br></br>,
        );
        return (
            <div id="editingListContainer">
                <ul id="editingList" style={listStyle}>
                    {test}
                </ul>
            </div>
        )
    }
}

export default EditingList;