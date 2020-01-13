import React from 'react';
import ListElement from './ListElement';

const listStyle = {
    listStyle: 'none'
};

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyList: []
        }
    }

    componentDidUpdate(prevProps) {
        var index = 1;
       // console.log("LE", this.props.array);
        if (prevProps.array !== this.props.array) {
            this.setState({
                storyList: this.props.array.map((e) =>
                    <ListElement num={e} id={"listEl" + e} key={e + Math.random()} indecies={this.props.removing}/>,
                    index++,
                )
            });
        }
    }


    render() {
        return (
            <div id="nameListContainer">
                <ul id="nameList" style={listStyle}>
                    {this.state.storyList}
                </ul>
            </div>
        );
    }
}

export default List;