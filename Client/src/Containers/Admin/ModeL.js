import { MDBModalBody, MDBInput, MDBModalHeader } from "mdbreact";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Select from "react-select";
import axios from "axios";

export default class ModeL extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    Name: this.props.name || "",
    QuestionType: {
      value: this.props.type || "Course",
      label: this.props.type || "Course"
    },
    TeachersList: [],
    DepartmentsList: [],
    SemesterList: [],
    CoursesList: [],
    SelectedTeacher: {},
    SelectedDepartment: {},
    SelectedSemester: {},
    SelectedCourse: {},
    Type: "",
    isMounted: false
  };
  OnNameChange = e => {
    this.setState({
      Name: e.target.value
    });
  };
  OnSelectedDepartmentChange = e => {
    this.setState({
      SelectedDepartment: e
    });
  };
  OnSelectedTeacherChange = e => {
    this.setState({
      SelectedTeacher: e
    });
  };
  OnSelectedSemesterChange = e => {
    this.setState({
      SelectedSemester: e
    });
  };
  OnSelectedCourseChange = e => {
    this.setState({
      SelectedCourse: e
    });
  };
  OnTypeChange = QuestionType => {
    this.setState({
      QuestionType
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    switch (this.state.Type) {
      case "department":
        await axios
          .post("department", {
            name: this.state.Name
          })
          .then(res => {
            this.props.Refresh();
            NotificationManager.success(
              "Successfully added",
              "Successful!",
              3000
            );
          })
          .catch(err => {
            this.props.toggle();
            NotificationManager.error("Something Went Wrong", "Error!", 3000);
          });
        break;
      case "question":
        await axios
          .post("question", {
            name: this.state.Name,
            type: this.state.QuestionType.value
          })
          .then(res => {
            this.props.Refresh();
            NotificationManager.success(
              "Successfully added",
              "Successful!",
              3000
            );
          })
          .catch(err => {
            this.props.toggle();
            NotificationManager.error("Something Went Wrong", "Error!", 3000);
          });
        break;
      case "editquestion":
        await axios
          .post("edit_question", {
            id: this.props.id,
            name: this.state.Name,
            type: this.state.QuestionType.value
          })
          .then(res => {
            this.props.Refresh();
            NotificationManager.success(
              "Successfully Edited",
              "Successful!",
              3000
            );
          })
          .catch(err => {
            this.props.toggle();
            NotificationManager.error("Something Went Wrong", "Error!", 3000);
          });
        break;
      case "course":
        await axios
          .post("course", {
            name: this.state.Name
          })
          .then(res => {
            this.props.Refresh();
            NotificationManager.success(
              "Successfully added",
              "Successful!",
              3000
            );
          })
          .catch(err => {
            this.props.toggle();
            NotificationManager.error("Something Went Wrong", "Error!", 3000);
          });

        break;
      case "teacher":
        await axios
          .post("teacher", {
            name: this.state.Name
          })
          .then(res => {
            this.props.Refresh();
            NotificationManager.success(
              "Successfully added",
              "Successful!",
              3000
            );
          })
          .catch(err => {
            this.props.toggle();
            NotificationManager.error("Something Went Wrong", "Error!", 3000);
          });

        break;
      case "assignteacher":
        let departmentId = this.state.SelectedDepartment.value;
        let semesterId = this.state.SelectedSemester.value;
        let courseId = this.state.SelectedCourse.value;
        let teacherId = this.state.SelectedTeacher.value;

        await axios
          .post("assigncourse", {
            departmentId: departmentId,
            semesterId: semesterId,
            courseId: courseId,
            teacherId: teacherId
          })
          .then(res => {
            this.props.Refresh();
            NotificationManager.success(
              "Successfully added",
              "Successful!",
              3000
            );
          })
          .catch(err => {
            this.props.toggle();
            NotificationManager.error("Something Went Wrong", "Error!", 3000);
            console.log(err);
          });

        break;
      default:
        this.props.toggle();
        NotificationManager.error("Something Went Wrong", "Error!", 3000);
    }
    this.setState({
      Name: "",
      QuestionType: {
        value: "Course",
        label: "Course"
      },
      Type: ""
    });
  };
  geteverything = async () => {
    await axios
      .get("getall")
      .then(res => {
        let department = res.data.department.map(e => {
          return { value: e._id, label: e.name };
        });
        let semester = res.data.semester.map(e => {
          return { value: e._id, label: e.name };
        });
        let teacher = res.data.teacher.map(e => {
          return { value: e._id, label: e.name };
        });
        let course = res.data.course.map(e => {
          return { value: e._id, label: e.name };
        });

        this.setState({
          ...this.state,
          DepartmentsList: department,
          CoursesList: course,
          SemesterList: semester,
          TeachersList: teacher,
          SelectedTeacher: {
            value: teacher[0].value,
            label: teacher[0].label
          },
          SelectedDepartment: {
            value: department[0].value,
            label: department[0].label
          },
          SelectedSemester: {
            value: semester[0].value,
            label: semester[0].label
          },
          SelectedCourse: {
            value: course[0].value,
            label: course[0].label
          }
        });
      })
      .catch(err => {
        NotificationManager.error("Something Went Wrong", "Error!", 3000);
        console.log(err);
      });
  };
  componentDidMount() {
    this.setState({ Type: this.props.Type });

    if (this.props.Type === "assignteacher") {
      this.geteverything();
    }
  }

  getmodel = Type => {
    switch (Type) {
      case "department":
        return (
          <MDBInput
            label="Enter Department Name"
            value={this.state.Name}
            onChange={this.OnNameChange}
            icon="envelope"
            group
            required
          />
        );
      case "question":
        return (
          <>
            <MDBInput
              label="Enter Question Name"
              value={this.state.Name}
              onChange={this.OnNameChange}
              icon="envelope"
              group
              required
            />
            <label>Type</label>
            <Select
              name="form-field-name"
              value={this.state.QuestionType}
              onChange={this.OnTypeChange}
              options={[
                { value: "Course", label: "Course" },
                { value: "Teacher", label: "Teacher" }
              ]}
              required
            />
          </>
        );
      case "editquestion":
        return (
          <>
            <MDBInput
              label="Enter Question Name"
              value={this.state.Name}
              onChange={this.OnNameChange}
              icon="envelope"
              group
              required
            />
            <label>Type</label>
            <Select
              name="form-field-name"
              value={this.state.QuestionType}
              onChange={this.OnTypeChange}
              options={[
                { value: "Course", label: "Course" },
                { value: "Teacher", label: "Teacher" }
              ]}
              required
            />
          </>
        );
      case "course":
        return (
          <MDBInput
            label="Enter Course Name"
            value={this.state.Name}
            onChange={this.OnNameChange}
            icon="envelope"
            group
            required
          />
        );
      case "teacher":
        return (
          <MDBInput
            label="Enter Teacher Name"
            value={this.state.Name}
            onChange={this.OnNameChange}
            icon="envelope"
            group
            required
          />
        );
      case "assignteacher":
        return (
          <>
            <label>Select Department</label>
            <Select
              name="Select"
              value={this.state.SelectedDepartment}
              onChange={this.OnSelectedDepartmentChange}
              options={this.state.DepartmentsList}
              required
            />
            <label>Select Course</label>
            <Select
              name="Select"
              value={this.state.SelectedCourse}
              onChange={this.OnSelectedCourseChange}
              options={this.state.CoursesList}
              required
            />
            <label>Select Semester</label>
            <Select
              name="Select"
              value={this.state.SelectedSemester}
              onChange={this.OnSelectedSemesterChange}
              options={this.state.SemesterList}
              required
            />
            <label>Select Teacher</label>
            <Select
              name="Select"
              value={this.state.SelectedTeacher}
              onChange={this.OnSelectedTeacherChange}
              options={this.state.TeachersList}
              required
            />
          </>
        );
      default:
        return null;
    }
  };
  render() {
    const MODEL = this.getmodel(this.props.Type);

    return (
      <>
        <MDBModalHeader toggle={this.props.toggle}>
          Kindly Fill In All The Fields
        </MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={this.onSubmit}>
            {MODEL}
            <button className="btn btn-info rounded-pill" type="submit">
              Save
            </button>
          </form>
        </MDBModalBody>
      </>
    );
  }
}
