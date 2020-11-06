import React from "react";
import {withRouter} from 'react-router-dom';
import {

    MDBNavbar,
    MDBNavbarNav,
    MDBNavItem,
    MDBIcon,
    MDBCollapse,
} from "mdbreact";
import classes from './index.module.css'
class NavReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleStateA: false
        };
    }

    handleToggleClickA = () => {
        this.setState({
            toggleStateA: !this.state.toggleStateA
        });
    };

    render() {
        return (
            <div>
                <div className="deep-blue-skin">
                    <div className="deep-blue-skin">

                    </div>
                    <MDBNavbar className="deep-blue" expand="md" fixed="top" style={{color:'#32313B'}}>
                        <MDBCollapse isOpen={this.state.collapsed} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem>
                                    <div
                                        onClick={this.handleToggleClickA}
                                        key="sideNavToggleA"
                                        style={{
                                            lineHeight: "10px",
                                            marginRight: "1em",
                                            verticalAlign: "middle"
                                        }}
                                    >
                                        <MDBIcon icon="bars" size="2x" className="mt-1" style={{color:'white'}}/>
                                    </div>
                                </MDBNavItem>

                            </MDBNavbarNav>
                            <MDBNavbarNav left>
                                <MDBNavItem
                                    className="d-none d-md-inline"
                                    onClick={() => {this.props.history.push('/home');}}
                                    // style={{
                                    //     cursor:'pointer',
                                    //     fontFamily:'Comic Sans MS',
                                    //     fontSize: '25px',
                                    //     fontStyle: 'normal',
                                    //     color:'white',
                                    //     fontWeight: '700',
                                    // }}
                                >

                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </div>


            </div>

        );
    }
}
export const Nav = withRouter(NavReact)
