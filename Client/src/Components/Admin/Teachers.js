import React, { PureComponent } from "react";
import Btable from "../../Containers/Admin/BTable";
import Model from "../../Containers/Admin/ModeL";
import Navbarr from "../../Containers/Admin/Navbarr";
import { MDBModal, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { NotificationManager } from "react-notifications";
import Axios from "axios";

import Loader from "../../Containers/Admin/Loader";
import { CSVReader } from "react-papaparse";
export default class Teachers extends PureComponent {
  state = {
    isLoading: true,
    assign: {
      columns: [
        {
          label: "Teacher",
          field: "teacher",
          sort: "asc",
        },
        {
          label: "Course",
          field: "course",
          sort: "asc",
        },
        {
          label: "Department",
          field: "department",
          sort: "asc",
        },
        {
          label: "Semester",
          field: "semester",
          sort: "asc",
        },
        {
          label: "Delete",
          field: "delete",
          sort: "asc",
        },
      ],
      rows: [],
    },
    teacher: {
      columns: [
        {
          label: "Teacher",
          field: "teacher",
          sort: "asc",
        },
        {
          label: "Delete",
          field: "delete",
          sort: "asc",
        },
      ],
      rows: [],
    },
    modal: false,
    modeltype: "",
    what: false,
    teacherChunk: [],
  };
  toggle = (e) => {
    this.setState({
      modal: !this.state.modal,
      modeltype: e,
    });
  };

  getAssignedTeachers = async () => {
    this.setState({ isLoading: true });
    await Axios.get("assigncourse")
      .then((res) => {
        let rows = res.data.data.map((v) => {
          return {
            teacher: v.teacherId,
            course: v.courseId,
            department: v.departmentId,
            semester: v.semesterId,
            delete: (
              <button
                onClick={() => this.onDelete(v._id, false)}
                className="btn btn-danger btn-sm rounded-pill"
              >
                Delete
              </button>
            ),
          };
        });
        let rows2 = res.data.teachers.map((v) => {
          return {
            teacher: v.name,
            delete: (
              <button
                onClick={() => this.onDelete(v._id, true)}
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
          assign: { ...this.state.assign, rows },
          teacher: { ...this.state.teacher, rows: rows2 },
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };
  onDelete = async (id, isteacher) => {
    this.setState({ isLoading: true });
    let urll = "assign_del_course";
    if (isteacher) {
      urll = "del_teacher";
    }
    await Axios.post(urll, {
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
  setWhat = (e) => {
    this.setState({ ...this.state, what: e });
  };
  async componentDidMount() {
    this.getAssignedTeachers();
  }
  Refresh = (e) => {
    this.setState({ modal: false, isLoading: false });
    this.getAssignedTeachers();
  };
  handleOnDrop = (data) => {
    this.setState({ ...this.state, teacherChunk: data });
    console.log(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    this.setState({ ...this.state, teacherChunk: [] });
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    this.setState({ ...this.state, teacherChunk: [] });
    console.log(data);
  };
  uploadTeachers = async () => {
    Axios.post("teacher_chunk", {
      teacherChunk: this.state.teacherChunk,
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
        <MDBContainer className="justify-content-center d-flex">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={() => this.setWhat(true)}
              type="button"
              className="btn btn-warning"
            >
              Teacher
            </button>
            <button
              onClick={() => this.setWhat(false)}
              type="button"
              className="btn btn-warning"
            >
              Assigne Course
            </button>
          </div>
        </MDBContainer>
        {this.state.what ? (
          <>
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <CSVReader
                    onDrop={this.handleOnDrop}
                    onError={this.handleOnError}
                    addRemoveButton
                    onRemoveFile={this.handleOnRemoveFile}
                  >
                    <span>Drop Teachers.csv Here</span>
                  </CSVReader>
                </MDBCol>
                <button
                  onClick={this.uploadTeachers}
                  className="btn btn-success btn-sm"
                >
                  Insert
                </button>
              </MDBRow>
            </MDBContainer>
            <MDBContainer className="heavy-rain-gradient rounded hoverable">
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <Btable data={this.state.teacher} />
              )}
            </MDBContainer>
            <MDBContainer className="text-center">
              <btn
                className=" btn btn-primary rounded-pill"
                onClick={() => this.toggle("teacher")}
              >
                Add A New Teacher
              </btn>
            </MDBContainer>
          </>
        ) : (
          <>
            <MDBContainer className="heavy-rain-gradient rounded hoverable">
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <Btable data={this.state.assign} />
              )}
            </MDBContainer>
            <MDBContainer className="text-center">
              <btn
                className="btn btn-primary rounded-pill"
                value="assignteacher"
                onClick={() => this.toggle("assignteacher")}
              >
                Assign Course To Existing Teacher
              </btn>
            </MDBContainer>
          </>
        )}

        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="rounded hoverable animated zoomInUp"
        >
          <Model
            Type={this.state.modeltype}
            scorllable
            responsive
            Refresh={this.Refresh}
            toggle={this.toggle}
          />
        </MDBModal>
      </Navbarr>
    );
  }
}
