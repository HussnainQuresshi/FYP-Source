import React, { PureComponent } from "react";
import Navbarr from "../../Containers/Admin/Navbarr";
import { MDBRow, MDBContainer, MDBInput } from "mdbreact";

import axios from "axios";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import Loader from "../../Containers/Admin/Loader";
import BTable from "../../Containers/Admin/BTable";

export default class Home extends PureComponent {
  state = {
    Dep: "",
    sem: "",
    selectedBatch: "",
    selectedDep: "",
    selectedSem: "",
    isLoading: true,
    data: "",
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
        label: "No of Evaluations Done",
        field: "evalution",
        sort: "asc",
      },
    ],
    rows: [],
  };
  onDepChange = (e) => {
    this.setState({
      selectedDep: e,
    });
  };
  onSemChange = (e) => {
    this.setState({
      selectedSem: e,
    });
  };
  onSubmit = () => {
    this.setState({ isLoading: true });
    axios
      .post("dashboard", {
        semester: this.state.selectedSem.value,
        department: this.state.selectedDep.value,
        batch: this.state.selectedBatch,
      })
      .then((res) => {
        console.log(res);
        let results = res.data.updatedResults;
        let rows = results.map((r) => {
          return {
            teacher: r.teacherId,
            course: r.courseId,
            evalution: r.totalstudents,
          };
        });
        this.setState({ ...this.state, isLoading: false, rows: rows });
      })
      .catch((err) => {
        NotificationManager.error("Something Went Wrong", "Error!", 3000);
      });
    this.setState({ isLoading: false });
  };
  requiredData = async () => {
    this.setState({ isLoading: true });
    await axios
      .get("getall")
      .then((res) => {
        let department = res.data.department.map((e) => {
          return { value: e._id, label: e.name };
        });
        let semester = res.data.semester.map((e) => {
          return { value: e._id, label: e.name };
        });
        if (department[0] && semester[0])
          this.setState({
            ...this.state,
            Dep: department,
            Sem: semester,
            isLoading: false,
            selectedDep: {
              value: department[0].value,
              label: department[0].label,
            },
            selectedSem: {
              value: semester[0].value,
              label: semester[0].label,
            },
          });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        this.props.history.push("/Adminlogin");
        NotificationManager.error("Something Went Wrong", "Error!", 3000);
        console.log(err);
      });
    this.setState({ isLoading: false });
  };
  onBatchChange = (e) => {
    this.setState({
      selectedBatch: e.target.value,
    });
  };
  componentDidMount() {
    this.requiredData();
  }
  render() {
    return (
      <Navbarr {...this.props}>
        <div className="row justify-content-center mt-3">
          <div className="col">
            <label className="m">
              <strong>Department</strong>
            </label>
          </div>
          <div className="col">
            <Select
              label="department"
              value={this.state.selectedDep}
              onChange={this.onDepChange}
              options={this.state.Dep}
              required
            />
          </div>
          <div className="col">
            <label className="m-1">
              <strong>Semester</strong>
            </label>
          </div>
          <div className="col">
            <Select
              label="Semester"
              value={this.state.selectedSem}
              onChange={this.onSemChange}
              options={this.state.Sem}
              required
            />
          </div>
          <div className="col">
            <label className="m-1">
              <strong>Batch</strong>
            </label>
          </div>
          <div className="col">
            <input
              className="form-control"
              type="number"
              value={this.state.selectedBatch}
              onChange={this.onBatchChange}
              required
            />
          </div>
          <div className="col">
            <button
              className="btn btn-success btn-sm mt-0"
              onClick={this.onSubmit}
            >
              Check
            </button>
          </div>
        </div>

        <MDBContainer className="heavy-rain-gradient rounded hoverable mt-5">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <BTable data={this.state}>Results</BTable>
          )}
        </MDBContainer>
      </Navbarr>
    );
  }
}
