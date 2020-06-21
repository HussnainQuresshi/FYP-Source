import React, { Component } from "react";

import {
  MDBCard,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardBody,
  MDBContainer,
  MDBInput,
  MDBFooter,
} from "mdbreact";
import Navbarr from "../../Containers/Admin/Navbarr";
import Axios from "axios";
import { NotificationManager } from "react-notifications";
export default class Setting extends Component {
  state = {
    isLoading: true,
    username: "",
    email: "",
    password: "",
  };
  onUserChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onPassChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    Axios.post("adminupdate", {
      ...this.state,
    })
      .then((res) => {
        NotificationManager.success(
          "Successfully Updated !",
          "Successfull!",
          3000
        );
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        NotificationManager.error("Cant Update", "Error!", 3000);
        this.setState({
          isLoading: false,
        });
        console.log(err);
      });
  };
  render() {
    return (
      <Navbarr {...this.props}>
        <MDBContainer className="mt-5">
          <form onSubmit={this.onSubmit}>
            <MDBCard className=" mt-5">
              <MDBCardHeader className="mt-3 m-auto justify-content-center d-flex deep-blue-gradient rounded card-cascade-narrower card-cascade">
                <MDBCardTitle>Edit You Profile</MDBCardTitle>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBInput
                  label="Type your email"
                  icon="envelope"
                  type="email"
                  group
                  validate
                  error="wrong"
                  success="right"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  required
                />
                <MDBInput
                  label="Type your Name"
                  icon="envelope"
                  type="text"
                  group
                  validate
                  error="wrong"
                  success="right"
                  value={this.state.username}
                  onChange={this.onUserChange}
                  required
                />
                <MDBInput
                  label="Type new password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  value={this.state.password}
                  onChange={this.onPassChange}
                  required
                />
              </MDBCardBody>
              <MDBFooter className="m-auto align-content-conter">
                <button className="btn btn-lg d-flex btn-warning" type="submit">
                  Update
                </button>
              </MDBFooter>
            </MDBCard>
          </form>
        </MDBContainer>
      </Navbarr>
    );
  }
}
