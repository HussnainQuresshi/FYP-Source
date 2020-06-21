import React, { Component } from "react";
import Btable from "../../Containers/Admin/BTable";
import Model from "../../Containers/Admin/ModeL";
import { MDBModal, MDBContainer, MDBCol, MDBRow } from "mdbreact";
import Navbarr from "../../Containers/Admin/Navbarr";
import { NotificationManager } from "react-notifications";
import axios from "axios";

import Loader from "../../Containers/Admin/Loader";
import { CSVReader } from "react-papaparse";
export default class Departments extends Component {
  state = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Delete",
        field: "delete",
        sort: "asc",
      },
    ],
    rows: [],
    modal: false,
    isLoading: true,
    dummy: false,
    departmentChunk: [],
  };
  onDelete = async (id) => {
    this.setState({ isLoading: true });
    await axios
      .post("del_department", {
        del_id: id,
      })
      .then((res) => {
        this.Refresh();
        NotificationManager.success(
          "Successfully deleted",
          "Successful!",
          3000
        );
      })
      .catch((err) => {
        console.log(err);
        this.Refresh();
      });
  };
  getDepartment = async () => {
    this.setState({ isLoading: true });
    await axios
      .get("department")
      .then((res) => {
        let rows = res.data.departments.map((v) => {
          return {
            name: v.name,
            delete: (
              <button
                onClick={() => this.onDelete(v._id)}
                className="btn btn-danger btn-sm rounded-pill"
              >
                Delete
              </button>
            ),
          };
        });
        this.setState({
          ...this.state,
          isLoading: false,
          rows,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  async componentDidMount() {
    this.getDepartment();
  }
  Refresh = (e) => {
    this.setState({ modal: false });
    this.getDepartment();
  };
  handleOnDrop = (data) => {
    this.setState({ ...this.state, departmentChunk: data });
    console.log(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    this.setState({ ...this.state, departmentChunk: [] });
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    this.setState({ ...this.state, departmentChunk: [] });
    console.log(data);
  };
  uploadDepartments = async () => {
    axios
      .post("department_chunk", {
        departmentChunk: this.state.departmentChunk,
      })
      .then((res) => {
        this.Refresh();
        NotificationManager.success(
          "Successfully Inserted CSV file",
          "Successful!",
          3000
        );
        console.log(res);
      })
      .catch((err) => {
        this.Refresh();
        NotificationManager.error("Something Went Wrong !", "Error!", 3000);
        console.log(err);
      });
  };
  render() {
    return (
      <Navbarr {...this.props}>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <CSVReader
                onDrop={this.handleOnDrop}
                onError={this.handleOnError}
                addRemoveButton
                onRemoveFile={this.handleOnRemoveFile}
              >
                <span>Drop Departments.csv Here</span>
              </CSVReader>
            </MDBCol>
            <button
              onClick={this.uploadDepartments}
              className="btn btn-success btn-sm"
            >
              Insert
            </button>
          </MDBRow>
        </MDBContainer>
        <MDBContainer className="heavy-rain-gradient rounded hoverable mt-5">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <Btable data={this.state}>Department</Btable>
          )}
        </MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <Model
            {...this.props}
            className="rounded hoverable animated zoomInUp"
            Type="department"
            scorllable
            responsive
            toggle={this.toggle}
            Refresh={this.Refresh}
          />
        </MDBModal>
        <MDBContainer className="text-center">
          <btn className=" btn btn-info rounded-pill" onClick={this.toggle}>
            New
          </btn>
        </MDBContainer>
      </Navbarr>
    );
  }
}
