import React, { Component } from "react";
import { MDBModalHeader } from "mdbreact";
import BTable from "./BTable";

export default class ResultsChart extends Component {
  state = {
    columns: [
      {
        label: "Question",
        field: "question",
        sort: "asc"
      },
      {
        label: "S.Agree",
        field: "sagree",
        sort: "asc"
      },
      {
        label: "Agree",
        field: "agree",
        sort: "asc"
      },
      {
        label: "Netural",
        field: "netural",
        sort: "asc"
      },
      {
        label: "Disagreenpn",
        field: "disagree",
        sort: "asc"
      },
      {
        label: "S.Disagree",
        field: "sdisagree",
        sort: "asc"
      },
      {
        label: "total",
        field: "total",
        sort: "asc"
      },
      {
        label: "WA",
        field: "wa",
        sort: "asc"
      }
    ],
    rows: []
  };
  componentDidMount() {
    if (this.props.iscourse) {
      let rows = this.props.data.course.map(r => {
        return {
          question: r.questionId,
          sagree: r.sa,
          agree: r.a,
          netural: r.n,
          disagree: r.d,
          sdisagree: r.sd,
          total: r.sa + r.a + r.n + r.d + r.sd,
          wa: r.response
        };
      });
      this.setState({ ...this.state, rows: rows });
    } else {
      let rows = this.props.data.teacher.map(r => {
        return {
          question: r.questionId,
          sagree: r.sa,
          agree: r.a,
          netural: r.n,
          disagree: r.d,
          sdisagree: r.sd,
          total: r.sa + r.a + r.n + r.d + r.sd,
          wa: r.response
        };
      });
      this.setState({ ...this.state, rows: rows });
    }
  }

  render() {
    return (
      <React.Fragment>
        <MDBModalHeader toggle={this.props.toggle}>
          {this.props.iscourse ? (
            <>Course Evaluation Results</>
          ) : (
            <>Teacher Evaluation Results</>
          )}
        </MDBModalHeader>
        <BTable data={this.state} />
      </React.Fragment>
    );
  }
}
