import React, { Component } from "react";
import {
  MDBFormInline,
  MDBInput,
  MDBCardHeader,
  MDBCardBody,
  MDBCard
} from "mdbreact";

export default class Question extends Component {
  render() {
    return (
      <MDBCard style={{ width: "77vw" }} className="m-3 form-group">
        {this.props.ischecked ? (
          <MDBCardHeader className="dusty-grass-gradient">
            {this.props.question}({this.props.type})
          </MDBCardHeader>
        ) : (
          <MDBCardHeader className="peach-gradient">
            {this.props.question}({this.props.type})
          </MDBCardHeader>
        )}
        <MDBCardBody className="heavy-rain-gradient">
          <MDBFormInline>
            <MDBInput
              gap
              name={this.props.question}
              onClick={this.props.onQuestion}
              checked={this.props.radio === "5" ? true : false}
              value="5"
              style={{ width: "0.8rem", height: "0.8rem" }}
              type="radio"
            />
            <label className="mr-4 ml-3">Strongly Agree</label>
            <MDBInput
              gap
              name={this.props.question}
              onClick={this.props.onQuestion}
              checked={this.props.radio === "4" ? true : false}
              value="4"
              style={{ width: "0.8rem", height: "0.8rem" }}
              type="radio"
            />
            <label className="mr-4 ml-3">Agree</label>
            <MDBInput
              gap
              name={this.props.question}
              onClick={this.props.onQuestion}
              checked={this.props.radio === "3" ? true : false}
              value="3"
              style={{ width: "0.8rem", height: "0.8rem" }}
              type="radio"
            />
            <label className="mr-4 ml-3">Netural</label>
            <MDBInput
              gap
              name={this.props.question}
              onClick={this.props.onQuestion}
              checked={this.props.radio === "2" ? true : false}
              value="2"
              style={{ width: "0.8rem", height: "0.8rem" }}
              type="radio"
            />
            <label className="mr-4 ml-3">Disagree</label>

            <MDBInput
              onClick={this.props.onQuestion}
              checked={this.props.radio === "1" ? true : false}
              value="1"
              name={this.props.question}
              style={{ width: "0.8rem", height: "0.8rem" }}
              type="radio"
              requried
            />
            <label className="mr-4 ml-3">Strongly Disagree</label>
          </MDBFormInline>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
