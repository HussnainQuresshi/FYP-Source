import React, { PureComponent } from "react";
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
import { NotificationManager } from "react-notifications";
import Navbarr from "../../Containers/User/Navbarr";
import axios from "axios";
import { Redirect } from "react-router";
import { login, getCurrentAdmin } from "../../services/adminService";
class Adminlogin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onUserChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onPassChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let data = { ...this.state };
    try {
      await login(data);
      this.setState({
        email: "",
        password: "",
      });
      NotificationManager.success("Signed IN", "Successful!", 3000);
      this.props.history.push("/AdminPanel");
    } catch (error) {
      NotificationManager.error("Wrong Crdentionals", "Error!", 3000);
      console.log(error);
    }
  };
  createadminlogin = async () => {
    await axios
      .post("/adminsignup", {
        username: "admin",
        email: "admin@admin.com",
        password: "admin",
      })
      .then((res) => {})
      .catch((err) => {});
  };
  componentDidMount() {
    this.createadminlogin();
  }
  render() {
    if (getCurrentAdmin()) return <Redirect to="/AdminPanel" />;
    return (
      <Navbarr
        goback={true}
        isnormalpage={true}
        {...this.props}
        check={true}
        title="Admin Login"
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
                <MDBCardHeader className="form-header deep-blue-gradient rounded card-cascade-wider card-cascade">
                  <h3 className="my-2">
                    <MDBIcon icon="lock " /> Login:
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.onSubmit}>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      type="email"
                      group
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.onUserChange}
                      required
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.password}
                      onChange={this.onPassChange}
                      required
                    />
                  </div>

                  <div className="text-center mt-4">
                    <MDBBtn
                      color="light-blue"
                      className="mb-3 rounded-pill"
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
export default Adminlogin;
