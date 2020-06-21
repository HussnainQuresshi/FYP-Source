import React, { Component } from "react";
import { MDBContainer, MDBCard, MDBCardImage, MDBCardBody } from "mdbreact";

export default class About extends Component {
  render() {
    let github = "";
    let facebook = "";
    let insta = "";
    let links = [
      {
        GITHUB:
          "https://github.com/HussnainQuresshi/resume/blob/master/HussnainQureshi.pdf",
        FACEBOOK: "https://www.facebook.com/profile.php?id=100007247206059",
        INSTA: "https://www.instagram.com/hussnain__hashmi/?hl=en",
      },
      {
        GITHUB: "/linktogithub",
        FACEBOOK: "https://www.facebook.com/profile.php?id=100004448202009",
        INSTA: "https://www.instagram.com/usahibzadamuhammad/?hl=en",
      },
      {
        GITHUB: "/linktogithub",
        FACEBOOK: "https://www.facebook.com/profile.php?id=100009085328936",
        INSTA: "https://www.instagram.com/basita167/?hl=en",
      },
    ];
    if (this.props.cardtitle === "Hussnain") {
      github = links[0].GITHUB;
      facebook = links[0].FACEBOOK;
      insta = links[0].INSTA;
    } else if (this.props.cardtitle === "Usman") {
      github = links[1].GITHUB;
      facebook = links[1].FACEBOOK;
      insta = links[1].INSTA;
    } else if (this.props.cardtitle === "Basit") {
      github = links[2].GITHUB;
      facebook = links[2].FACEBOOK;
      insta = links[2].INSTA;
    }
    return (
      <MDBCard className="d-flex hoverable deep-blue-gradient m-2 animated pulse">
        <MDBCardImage
          className="mx-auto white rounded-circle "
          style={{ width: "200px" }}
          src={this.props.pic}
          alt="pics"
        />
        <MDBCardBody>
          <h5 className="card-title d-flex justify-content-center mb-3">
            Developer
          </h5>
          <h4 className="card-title d-flex justify-content-center">
            {this.props.cardtitle}
          </h4>
          <hr />
          <MDBContainer className="d-flex justify-content-center">
            <a
              style={{ fontSize: "30px", color: "inherit" }}
              href={facebook}
              className="fab fa-facebook m-4 text-primary"
            />

            <a
              style={{ fontSize: "30px", color: "inherit" }}
              href={insta}
              className="fab fa-instagram m-4 text-danger"
            />

            {this.props.cardtitle === "Hussnain" ? (
              <a
                style={{ fontSize: "30px", color: "inherit" }}
                href={github}
                className="fab fa-github m-4 text-dark"
              />
            ) : (
              ""
            )}
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
