import React from 'react';
import { render } from 'react-dom';
import HomePage from './Homepage';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/bill.css';

class Bill extends React.Component {

    back() {
        render(
            <HomePage/>, document.getElementById('root')
        );
    }
    render() {
        return (
           <div id="billRoot">
               <NavBar title="Bill Splitter"/>
               <p>Bill page</p>
               <Footer/>
           </div> 
        );
    }
}

export default Bill;