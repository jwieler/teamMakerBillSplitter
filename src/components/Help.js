import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/help.css";

const teamBody = (
    <div>
        <h1>Overview</h1>
        <p>
            The teams page is dedicated to making any number of teams with any number of people that you need. All you
            need is a list of names (or whatever you want to split up into groups). You can copy and paste your list
            into the main text area on the team maker page, this list must be a comma separated list (csv). If your list
            is not a csv (i.e. you have a list of names in excel), you can use the formatting tool (you can access this
            by clicking the "here" link on the team maker page). The formatting tool allows you to copy and paste your
            list in whatever format it is in, select the format from the drop down, and format it to be a csv so that
            you can use it to make teams. Once you have a properly formatted list, simply copy and paste it into the
            text area and select add names. This will add the names from the list onto the page. Once you have added all
            the names you want, you can select how many teams you desire. Note that the number of teams will not be able
            to be larger than the number of people you have in the list. After you selected the number of teams you
            want, simply click make teams and the site will generate a list of teams with the most evenly distributed
            teams (the max difference in number of people on a team will be 1). You can then click export list to copy
            this list to your clipboard, now the list can be pasted into any document of your choice for whatever you
            need it for.
        </p>
        <p>
            Or, you can enter in each name one at a time using the “add name” button and text box. After you type in a
            name, click add name and that name will be added to the list. The process for making the teams from here is
            the same as the last, once you have all the names, specify the number of teams you want, and then click make
            teams. You can then export the teams.
        </p>
        <h1>Helpful Tools</h1>
        <p>
            There are some helpful tools on this page as well, you can edit any name that you have put into the list if
            you make a mistake, simply click on the name you want to edit in the list, the name should then turn blue.
            Now click edit name, and the form for editing the name will appear. Simply enter the new name (edited
            version of the name or a new name altogether) into the text field and select confirm. The name should now be
            changed. You can also remove any number of names at once if you entered in names by mistake. To do so,
            select the names you want to remove by clicking on them in the list, the names should turn blue as well.
            Once you have selected all the names that you want to remove, click remove name(s) and the names should be
            deleted. There is also a clear list button to easily clear the list if you want to start over (there will be
            a confirmation pop up to make sure you don’t clear the list by accident). You can also edit the team names
            once teams have been made (default team names are team 1, team 2, etc.). Simply click edit team names, and
            enter in your new team names in their corresponding fields. Once you have entered in the new team names,
            click confirm edits. The team names should now be changed.
        </p>
        <h1>Collapsing and Expanding Lists</h1>
        <p>
            If the lists become too long, you can collapse them to be scrollable so that you can navigate the page
            easier. This can be done with both the list of names and the team list, simply click the collapse list
            button that appears near the respective list to collapse it. You can expand the list back to full view by
            clicking the expand list button (this will be in the same spot as the collapse list button as it gets
            replaced when the list is expanded and vice versa).
        </p>
    </div>
);
class Help extends React.Component {
    constructor(props) {
        super(props);

        this.team = this.team.bind(this);
        this.bill = this.bill.bind(this);

        this.state = {
            team: false,
            bill: false
        };
    }

    team() {
        this.setState({ team: true, bill: false });
    }

    bill() {
        this.setState({ bill: true, team: false });
    }

    render() {
        let team = "";
        let bill = "";
        if (this.state.team) {
            team = teamBody;
        } else if (this.state.bill) {
            bill = <p>Bill</p>;
        }
        return (
            <div id="helpRoot">
                <NavBar title="Help" page="Help" />
                <div id="helpContainer">
                    <h2>Feeling lost? That's ok, hopefully this page can help you out.</h2>
                    <h2>Which page are you confused about?</h2>
                    <ul>
                        <li>
                            <button
                                style={{ padding: "5px", marginLeft: "5px" }}
                                className="link-button help-button"
                                onClick={this.bill}
                            >
                                Bill Splitter
                            </button>
                            <button style={{ padding: "5px" }} className="link-button help-button" onClick={this.team}>
                                Team Maker
                            </button>
                        </li>
                    </ul>
                    <div id="instructions">
                        {bill}
                        {team}
                    </div>
                    <div id="FAQ">
                        <h2 style={{ textDecoration: "underline" }}>Quick Answers</h2>
                        <ul>
                            <li className="listBox">
                                <h3>Q: How do I navigate this site?</h3>
                                <p>
                                    A: That's easy! There is a menu button in the top right of the window (the one that
                                    looks like a hamburger). If you click this, you will see a menu pop up. Here you can
                                    click on any of the links to navigate to their respective pages. For example: the
                                    home link will take you to the home page, the about link will take you to the about
                                    page etc. Exceptions are for the twitter, github, and Linkedin links. Those will
                                    take you to external sites (being Twitter, Github, and Linkedin respectively). On
                                    the homepage, there are two buttons to take you to the two main pages of this
                                    application: Team Maker and Bill Splitter. Simply clicking on these from the Home
                                    page will take you to the respective page. On any page that isn't the home page,
                                    there will be a button in the top left of the window that says "home". Clicking this
                                    button will bring you back to the homepage.
                                </p>
                            </li>
                            <li className="listBox">
                                <h3>Q: Sample Q</h3>
                                <p>
                                    A: Sample Answers Sample Answers Sample Answers Sample Answers Sample Answers Sample
                                    Answers Sample Answers Sample Answers Sample Answers v v Sample Answers Sample
                                    Answers Sample Answers Sample Answers Sample Answers Sample Answers Sample Answers
                                    Sample Answers Sample Answers Sample Answers v
                                </p>
                            </li>
                        </ul>
                    </div>
                    <hr />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Help;
