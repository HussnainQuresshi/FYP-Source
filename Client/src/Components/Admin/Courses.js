import React, { PureComponent } from "react";
import Btable from "../../Containers/Admin/BTable";
import Navbarr from "../../Containers/Admin/Navbarr";
import Model from "../../Containers/Admin/ModeL";
import { MDBModal, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { NotificationManager } from "react-notifications";
import Axios from "axios";

import Loader from "../../Containers/Admin/Loader";
import { CSVReader } from "react-papaparse";
export default class Courses extends PureComponent {
  state = {
    columns: [
      {
        label: "Course",
        field: "course",
        sort: "asc",
      },
      {
        label: "Delete",
        field: "delete",
        sort: "asc",
      },
    ],
    rows: [],
    isLoading: true,
    modal: false,
    semesterChunk: [],
    courseChunk: [],
  };
  //PAPA PARSE=====================
  handleOnDrop = (data) => {
    this.setState({ ...this.state, semesterChunk: data });
    console.log(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    this.setState({ ...this.state, semesterChunk: [] });
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    this.setState({ ...this.state, semesterChunk: [] });
    console.log(data);
  };
  handleOnDropC = (data) => {
    this.setState({ ...this.state, courseChunk: data });
    console.log(data);
  };

  handleOnErrorC = (err, file, inputElem, reason) => {
    this.setState({ ...this.state, courseChunk: [] });
    console.log(err);
  };

  handleOnRemoveFileC = (data) => {
    this.setState({ ...this.state, courseChunk: [] });
    console.log(data);
  };
  //==========================
  uploadSemesterCourse = async () => {
    Axios.post("semester_course_chunk", {
      courseChunk: this.state.courseChunk,
      semesterChunk: this.state.semesterChunk,
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
  onDelete = async (e) => {
    this.setState({ isLoading: true });
    await Axios.post("del_course", {
      del_id: e,
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

  getCourse = async () => {
    this.setState({ isLoading: true });
    await Axios.get("course")
      .then((res) => {
        let rows = res.data.courses.map((v, i) => {
          return {
            course: v.name,
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
  componentDidMount() {
    this.getCourse();
  }
  Refresh = (e) => {
    this.setState({ modal: false });
    this.getCourse();
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
                <span>Drop Semesters.csv Here</span>
              </CSVReader>
            </MDBCol>
            <MDBCol>
              <CSVReader
                onDrop={this.handleOnDropC}
                onError={this.handleOnErrorC}
                addRemoveButton
                onRemoveFile={this.handleOnRemoveFileC}
              >
                <span>Drop Courses.csv Here</span>
              </CSVReader>
            </MDBCol>
            <button
              onClick={this.uploadSemesterCourse}
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
            <Btable data={this.state}>Courses</Btable>
          )}
        </MDBContainer>
        <MDBModal
          className="rounded hoverable animated zoomInUp"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <Model
            Type="course"
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
