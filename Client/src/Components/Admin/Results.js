import React, { PureComponent } from "react";
import Navbarr from "../../Containers/Admin/Navbarr";
import ResultsChart from "../../Containers/Admin/ResultsChart";
import BTable from "../../Containers/Admin/BTable";
import { MDBModal, MDBContainer } from "mdbreact";

import Axios from "axios";
import Loader from "../../Containers/Admin/Loader";

export default class Results extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        {
          label: "Teacher",
          field: "teacher",
          sort: "asc",
        },
        {
          label: "Department",
          field: "department",
          sort: "asc",
        },
        {
          label: "Course",
          field: "course",
          sort: "asc",
        },
        {
          label: "Semester",
          field: "semester",
          sort: "asc",
        },
        {
          label: "Batch",
          field: "batch",
          sort: "asc",
        },
        {
          label: "Students",
          field: "evalution",
          sort: "asc",
        },
        {
          label: "CourseResults",
          field: "courseresults",
          sort: "asc",
        },
        {
          label: "TeacherResults",
          field: "teacherresults",
          sort: "asc",
        },
      ],
      rows: [],
      modal: false,
      ResultsTea: false,
      ResultsCou: false,
      data: "",
      i: 0,
    };
  }

  toggleCou = (i) => {
    this.setState({
      ResultsCou: !this.state.ResultsCou,
      i: i,
    });
  };
  toggleTea = (i) => {
    this.setState({
      ResultsTea: !this.state.ResultsTea,
      i: i,
    });
  };

  getResults = async () => {
    this.setState({ isLoading: true });
    await Axios.get("result")
      .then((res) => {
        let results = res.data.updatedResults;
        console.log(results);
        if (results) {
          let data = results.map((r) => {
            return {
              course: r.courseDetail,
              teacher: r.teacherDetail,
              total: r.totalstudents,
            };
          });
          console.log(res.data.updatedResults);
          let rows = results.map((r, i) => {
            return {
              teacher: r.teacherId,
              department: r.departmentId,
              course: r.courseId,
              semester: r.semesterId,
              batch: r.batch,
              evalution: r.totalstudents,
              courseresults: (
                <button
                  onClick={() => this.toggleCou(i)}
                  className="btn btn-warning btn-sm rounded-pill"
                >
                  Details
                </button>
              ),
              teacherresults: (
                <button
                  onClick={() => this.toggleTea(i)}
                  className="btn btn-warning btn-sm rounded-pill"
                >
                  Details
                </button>
              ),
            };
          });
          this.setState({
            ...this.state,
            isLoading: false,
            data: data,
            rows: rows,
          });
        } else {
          this.setState({
            ...this.state,
            isLoading: false,
            data: [],
            rows: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  componentDidMount() {
    this.getResults();
  }
  render() {
    return (
      <Navbarr {...this.props}>
        <MDBContainer className="heavy-rain-gradient rounded hoverable mt-5">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <BTable data={this.state}>Results</BTable>
          )}
        </MDBContainer>

        <MDBModal
          isOpen={this.state.ResultsTea || this.state.ResultsCou}
          toggle={this.state.ResultsTea ? this.toggleTea : this.toggleCou}
          className="rounded hoverable animated zoomInUp"
          size="fluid"
        >
          {this.state.ResultsTea ? (
            <ResultsChart
              iscourse={false}
              data={this.state.data[this.state.i]}
              toggle={this.toggleTea}
            />
          ) : (
            <ResultsChart
              iscourse={true}
              data={this.state.data[this.state.i]}
              toggle={this.toggleCou}
            />
          )}
        </MDBModal>
      </Navbarr>
    );
  }
}
