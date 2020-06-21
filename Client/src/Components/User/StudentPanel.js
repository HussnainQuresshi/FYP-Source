import React, { Component } from "react";
import Question from "../../Containers/User/Question";
import { MDBRow } from "mdbreact";
import Navbarr from "../../Containers/User/Navbarr";
import { NotificationManager } from "react-notifications";

import Axios from "axios";
import Select from "react-select";
export default class Studentpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EVULATIONDONE: false,
      Checking: "",
      Questions: [],
      Courses: [],
      selectedCourse: "",
      courseteacher: "",
      isdone: false,
      userinfo: {
        UserDepartment: "",
        UserSemester: "",
        UserCourse: "",
        UserTeacher: "",
        UserBatch: "",
      },
      btnenabler: true,
    };
  }
  onCourseChange = (e) => {
    this.setState({
      ...this.state,
      userinfo: {
        ...this.state.userinfo,
        UserCourse: e.label,
        UserTeacher: e.teachername,
      },
      selectedCourse: e,
    });
  };
  onQuestionClick = (e, id) => {
    const i = this.state.Questions.findIndex((q) => {
      return q.id === id;
    });
    const question = { ...this.state.Questions[i] };
    question.res = e.target.value;
    question.responce = parseInt(e.target.value, 10);
    const Questions = [...this.state.Questions];
    Questions[i] = question;
    let ischecked = Questions.map((e) => {
      if (!e.res) {
        return false;
      } else return true;
    });
    this.setState({
      ...this.state,
      Checking: ischecked,
      Questions: Questions,
    });
  };
  getCoursesQuestions = async () => {
    await Axios.get("getstudentdata")
      .then((res) => {
        if (res.data.data[0]) {
          let ques = res.data.Question.map((v) => {
            return {
              res: null,
              responce: 0,
              id: v._id,
              ques: v.name,
              type: v.type,
            };
          });
          let course = res.data.data.map((v) => {
            return {
              teachername: v.teacherId,
              value: v.courseIdn,
              label: v.courseId,
            };
          });
          this.setState({
            ...this.state,
            Courses: course,
            Questions: ques,
            selectedCourse: {
              value: course[0].value,
              label: course[0].label,
            },
            userinfo: {
              ...this.state.userinfo,
              UserDepartment: res.data.data[0].departmentId,
              UserSemester: res.data.data[0].semesterId,
              UserBatch: res.data.data[0].batch,
              UserTeacher: course[0].teachername,
              UserCourse: course[0].label,
            },
            btnenabler: true,
          });
        } else {
          this.evualtionisdone();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  evualtionisdone = async () => {
    this.setState({
      EVULATIONDONE: true,
    });
    NotificationManager.success(
      "Evulation Done loggin You Out",
      "Success!",
      1000
    );

    setTimeout(async () => {
      await Axios.get("usersignout")
        .then((res) => {
          NotificationManager.success("Have A Nice Day", "Thank You!", 3000);
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ btnenabler: false });
    let res = true;
    this.state.Questions.map((e) => {
      if (!e.res) {
        res = false;
      }
    });
    if (!res) {
      NotificationManager.error(
        "Kindly Attempt All The Answers",
        "Error!",
        3000
      );
      this.setState({ btnenabler: true });
    } else {
      let Question = this.state.Questions.map((e) => {
        return {
          questionId: e.id,
          response: e.responce,
          type: e.type,
        };
      });
      this.setState({ Questions: [] });
      Axios.post("result", {
        teacherId: this.state.userinfo.UserTeacher,
        courseId: this.state.selectedCourse.value,
        question: Question,
      })
        .then((res) => {
          NotificationManager.success("Evulation Submitted", "Success!", 3000);
          let ischecked = this.state.Questions.map((e) => {
            if (!e.res) {
              return false;
            } else return false;
          });
          this.setState({ ...this.state, Checking: ischecked });
          this.getCoursesQuestions();
        })
        .catch((err) => {
          NotificationManager.error("Internal Server Error", "Error!", 3000);
          this.setState({ btnenabler: true });
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.getCoursesQuestions();
  }
  render() {
    let questionss = null;
    questionss = (
      <MDBRow className="justify-content-center">
        {this.state.Questions.map((question, i) => {
          return (
            <Question
              ischecked={this.state.Checking[i]}
              radio={question.res}
              id={question.id}
              onQuestion={(e) => this.onQuestionClick(e, question.id)}
              question={question.ques}
              type={question.type}
            />
          );
        })}
      </MDBRow>
    );
    return (
      <Navbarr
        {...this.props}
        panal={true}
        data={this.state.userinfo}
        title="Teachers Evaluation"
      >
        {!this.state.EVULATIONDONE ? (
          <form>
            <div className="row justify-content-center mt-5">
              <div className="col-2">
                <label>
                  <strong>Select Course</strong>
                </label>
              </div>
              <div className="col-9">
                <Select
                  label="Select department"
                  value={this.state.selectedCourse}
                  onChange={this.onCourseChange}
                  options={this.state.Courses}
                  required
                />
              </div>
            </div>

            {this.state.selectedCourse ? (
              <div className="mt-1">{questionss}</div>
            ) : null}
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <button
                  className="btn btn-success rounded-pill form-control mb-3"
                  disabled={!this.state.btnenabler}
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-5">
            <div className="d-flex m-auto justify-content-center">
              <h1>Your Evaluation Is Completed Thanks For Your Response</h1>
            </div>
            <div className="d-flex m-auto justify-content-center">
              <div className=" loader"></div>
            </div>
          </div>
        )}
      </Navbarr>
    );
  }
}
