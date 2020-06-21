import React, { PureComponent } from "react";
import Navbarr from "../../Containers/Admin/Navbarr";
import { NotificationManager } from "react-notifications";
import {
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBInput,
  MDBCard,
  MDBContainer,
} from "mdbreact";
import BTable from "../../Containers/Admin/BTable";
import Axios from "axios";
import Select from "react-select";

import Loader from "../../Containers/Admin/Loader";
export default class Tokens extends PureComponent {
  state = {
    isLoading: true,
    what: true,
    Dep: [],
    Sem: [],
    columns: [
      {
        label: "Department",
        field: "department",
        sort: "asc",
      },
      {
        label: "Batch",
        field: "batch",
        sort: "asc",
      },
      {
        label: "Semester",
        field: "semester",
        sort: "asc",
      },
      {
        label: "Token ID",
        field: "tokenid",
        sort: "asc",
      },
    ],
    rows: [],
    selectedDep: "",
    selectedDepartment: "",
    selectedSemester: "",
    selectedBatch: null,
    NoOfTokens: null,
  };
  onDepChange = (e) => {
    this.setState({
      selectedDep: e,
    });
    this.Refresh(e.value);
  };
  onSemesterChange = (e) => {
    this.setState({
      selectedSemester: e,
    });
  };
  onDepartmentChange = (e) => {
    this.setState({
      selectedDepartment: e,
    });
  };
  onChangeNoOfTokens = (e) => {
    this.setState({
      NoOfTokens: e.target.value,
    });
  };
  onBatchChange = (e) => {
    this.setState({
      selectedBatch: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    await Axios.post("user", {
      departmentId: this.state.selectedDepartment.value,
      semesterId: this.state.selectedSemester.value,
      noOfToken: this.state.NoOfTokens,
      batch: this.state.selectedBatch,
    })
      .then((res) => {
        this.Refresh(this.state.selectedDep.value);
        NotificationManager.success(
          "Successfully Created Tokens",
          "Successful!",
          3000
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error("SomeThing Went Wrong", "Error!", 3000);
      });
    this.setState({
      ...this.state,
      selectedDepartment: "",
      selectedSemester: "",
      NoOfTokens: "",
      selectedBatch: "",
    });
  };
  toggle = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
    });
  };
  Refresh = (e) => {
    this.gettokens(e);
  };
  gettokens = async (e) => {
    this.setState({ isLoading: true });

    await Axios.post("getuser", {
      depId: e,
    })
      .then((res) => {
        let rows = res.data.tokens.map((v) => {
          return {
            department: v.departmentId,
            batch: v.batch,
            semester: v.semesterId,
            tokenid: v.token,
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
      });
  };
  requiredData = async () => {
    this.setState({ isLoading: true });
    await Axios.get("getall")
      .then((res) => {
        let department = res.data.department.map((e) => {
          return { value: e._id, label: e.name };
        });
        let semester = res.data.semester.map((e) => {
          return { value: e._id, label: e.name };
        });
        console.log(res.data);
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
          });
        this.gettokens(this.state.selectedDep.value);
      })
      .catch((err) => {
        NotificationManager.error("Something Went Wrong", "Error!", 3000);
        console.log(err);
      });
  };
  componentDidMount() {
    this.requiredData();
  }
  setWhat = (e) => {
    this.setState({ ...this.state, what: e });
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
              View Tokens
            </button>
            <button
              onClick={() => this.setWhat(false)}
              type="button"
              className="btn btn-warning"
            >
              Grnerate Tokens
            </button>
          </div>
        </MDBContainer>
        {this.state.what ? (
          <>
            <div className="row justify-content-center">
              <div className="col-2">
                <label className="m-2">
                  <strong>Select Department</strong>
                </label>
              </div>
              <div className="col">
                <Select
                  label="Select department"
                  value={this.state.selectedDep}
                  onChange={this.onDepChange}
                  options={this.state.Dep}
                  required
                />
              </div>
            </div>
            <div className="justify-content-center heavy-rain-gradient rounded hoverable m-2">
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <BTable print={true} data={this.state}>
                  Results
                </BTable>
              )}
            </div>
          </>
        ) : (
          <MDBContainer className="justify-content-center d-flex">
            <MDBCard
              style={{ maxHeight: "50rem", maxWidth: "50rem" }}
              className=" rounded hoverable responsive m-2"
            >
              <MDBCardHeader className="form-header btn-info disabled rounded  ">
                <h3 className="m-auto">
                  <MDBIcon icon="user p-1">
                    Generate Tokens For Evaulation
                  </MDBIcon>
                </h3>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <div className="grey-text">
                    <label className="mt-2">Select Department</label>
                    <Select
                      label="Select department"
                      value={this.state.selectedDepartment}
                      onChange={this.onDepartmentChange}
                      options={this.state.Dep}
                      required
                    />
                    <label className="mt-2">Select Semester</label>
                    <Select
                      name="form-field-name"
                      value={this.state.selectedSemester}
                      onChange={this.onSemesterChange}
                      options={this.state.Sem}
                      required
                    />
                    <MDBInput
                      label="Batch"
                      icon="list-ol"
                      group
                      type="number"
                      min="1"
                      validate
                      value={this.state.selectedBatch}
                      onChange={this.onBatchChange}
                      required
                    />
                    <MDBInput
                      label="No of tokens"
                      icon="list-ol"
                      group
                      type="number"
                      min="1"
                      validate
                      value={this.state.NoOfTokens}
                      onChange={this.onChangeNoOfTokens}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-info rounded-pill" type="submit">
                      Generate Tokens
                    </button>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        )}
      </Navbarr>
    );
  }
}
