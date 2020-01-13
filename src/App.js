import React from "react";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Help from "./components/Help";
import Teams from "./components/Teams";
import Bill from "./components/Bill";
import NotFound from "./components/NotFound";
import Format from "./components/Format";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/help">
                    <Help />
                </Route>
                <Route path="/bill">
                    <Bill />
                </Route>
                <Route path="/teams">
                    <Teams />
                </Route>
                <Route path="/format">
                    <Format />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
