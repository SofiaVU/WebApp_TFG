import React from 'react';
import './../assets/css/style.css';
import NavbarItem from "./NavbarItem";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id="navBar">
                <NavbarItem link={"News"} title={"News"}/>
                {
                    this.props.myself.admin && <NavbarItem link={"Management"} title={"Management"}/>
                }
            </div>
        );

    }
}