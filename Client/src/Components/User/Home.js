import React, { PureComponent } from "react";
import Slides from "../../Containers/Admin/Slides";
import { MDBRow, MDBContainer } from "mdbreact";
import Card from "../../Containers/User/Card";
import Navbarr from "../../Containers/User/Navbarr";
class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let card = [
      {
        id: "Student Login",
        url: "./Studentlogin",
        IMG: ""
      },
      {
        id: "Admin Login",
        url: "./AdminLogin",
        IMG: ""
      }
    ];
    let cards = null;
    cards = (
      <MDBRow className="container d-flex justify-content-center">
        {card.map(card => {
          return <Card ImgSource={card.IMG} name={card.id} URL={card.url} />;
        })}
      </MDBRow>
    );
    return (
      <Navbarr
        {...this.props}
        check={true}
        isnormalpage={true}
        title="Teachers Evaluaction Program QEC (UET Mardan KpK)"
      >
        <Slides />
        <MDBContainer className="mt-4">{cards}</MDBContainer>
      </Navbarr>
    );
  }
}

export default App;
