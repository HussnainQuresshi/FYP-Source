import React, { PureComponent } from "react";
import Btable from "../../Containers/Admin/BTable";
import Model from "../../Containers/Admin/ModeL";
import Navbarr from "../../Containers/Admin/Navbarr";
import { MDBModal, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { NotificationManager } from "react-notifications";
import Axios from "axios";

import Loader from "../../Containers/Admin/Loader";
import { CSVReader } from "react-papaparse";
export default class Questions extends PureComponent {
  state = {
    isLoading: true,
    columns: [
      {
        label: "Question",
        field: "question",
        sort: "asc",
      },
      {
        label: "Type",
        field: "type",
        sort: "asc",
      },
      {
        label: "Edit",
        field: "edit",
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
    ModelType: null,
    id: "",
    name: "",
    type: "",
    questionsChunk: [],
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  getQuestions = async () => {
    this.setState({ isLoading: true });
    await Axios.get("question")
      .then((res) => {
        let rows = res.data.questions.map((v) => {
          return {
            question: v.name,
            type: v.type,
            edit: (
              <button
                onClick={() => this.onEdit(v._id, v.name, v.type)}
                className="btn btn-warning btn-sm rounded-pill"
              >
                Edit
              </button>
            ),
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
  onEdit = async (id, name, type) => {
    this.setState({
      ModelType: "editquestion",
      id: id,
      name: name,
      type: type,
    });
    this.toggle();
  };
  onDelete = async (id) => {
    this.setState({ isLoading: true });
    await Axios.post("del_question", { del_id: id })
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
  async componentDidMount() {
    this.getQuestions();
  }
  Refresh = (e) => {
    this.setState({ modal: false });
    this.getQuestions();
  };

  handleOnDrop = (data) => {
    this.setState({ ...this.state, questionsChunk: data });
    console.log(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    this.setState({ ...this.state, questionsChunk: [] });
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    this.setState({ ...this.state, questionsChunk: [] });
    console.log(data);
  };
  //==========================
  uploadQuestions = async () => {
    Axios.post("questions_chunk", {
      questionChunk: this.state.questionsChunk,
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
                <span>Drop Questions.csv Here</span>
              </CSVReader>
            </MDBCol>
            <button
              onClick={this.uploadQuestions}
              className="btn btn-success btn-sm"
            >
              Insert
            </button>
          </MDBRow>
        </MDBContainer>
        <MDBContainer className="heavy-rain-gradient rounded hoverable mt-5 ">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <Btable data={this.state}>Questions</Btable>
          )}
        </MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <Model
            className="rounded hoverable animated zoomInUp"
            Type={this.state.ModelType || "question"}
            scorllable
            responsive
            id={this.state.id}
            name={this.state.name}
            type={this.state.type}
            Refresh={this.Refresh}
            toggle={this.toggle}
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
