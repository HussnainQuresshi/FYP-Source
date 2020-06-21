import React, { Component } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Navbarr from "../../Containers/User/Navbarr";
import { login } from "../../services/userService";
class Studentlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };
  }

  onTokenChange = (e) => {
    this.setState({
      token: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const token = this.state;
    try {
      await login(token);
      this.setState({
        token: "",
      });
      NotificationManager.success("Signed IN", "Successful!", 3000);
      this.props.history.push("/StudentPanel");
    } catch (error) {
      NotificationManager.error("Token Exparied !", "Error!", 3000);
      console.log(error);
    }
  };

  render() {
    return (
      <Navbarr
        goback={true}
        isnormalpage={true}
        check={true}
        {...this.props}
        title="Student Login"
      >
        <MDBContainer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="mt-5"
        >
          <MDBCol md="4" className="mt-5">
            <MDBCard className="hoverable mt-5 heavy-rain-gradient ">
              <MDBCardBody>
                <MDBCardHeader className="deep-blue-gradient rounded card-cascade-wider card-cascade">
                  <h3 className="my-2">
                    <MDBIcon icon="user p-1" />
                    Student Login
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.onSubmit}>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your token"
                      icon="lock"
                      group
                      type="text"
                      validate
                      value={this.state.token}
                      onChange={this.onTokenChange}
                      required="true"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="light-blue"
                      className="mb-3 btn deep-gradient rounded-pill"
                      type="submit"
                    >
                      Login
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </Navbarr>
    );
  }
}
export default withRouter(Studentlogin);
