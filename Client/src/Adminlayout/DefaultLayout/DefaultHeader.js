import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav
} from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../Extra/images/small_logo.png";

import sygnet from "../../Extra/images/small_logo.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        {!this.props.isnormalpage ? (
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
        ) : null}
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 50, alt: "uet Logo" }}
          minimized={{ src: sygnet, width: 50, height: 50, alt: "uet Logo" }}
        />
        {this.props.isadmin && !this.props.studentpanel ? (
          <>
            <AppSidebarToggler className="d-md-down-none" display="lg" />
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav direction="down">
                <DropdownToggle nav>
                  <strong>Setting</strong>
                  <img
                    src={"../../assets/img/avatars/6.jpg"}
                    className="img-avatar"
                    alt="admin@bootstrapmaster.com"
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header tag="div" className="text-center">
                    <strong>Account</strong>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/setting">
                      <i className="fa fa-bell-o"></i> Security
                    </Link>
                  </DropdownItem>
                  <DropdownItem onClick={() => this.props.onLogout()}>
                    <i className="fa fa-lock"></i> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </>
        ) : (
          <Nav className="ml-auto" navbar>
            {this.props.goback ? (
              <>
                <button
                  className="btn btn-info rounded-pill"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  <i className="fa fa-back" />
                  Back
                </button>
              </>
            ) : (
              <Link to="/about">
                <i className="fa">
                  <button className="btn btn-success rounded-pill">
                    <i className="fa fa-info" />
                    About
                  </button>
                </i>
              </Link>
            )}
          </Nav>
        )}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
