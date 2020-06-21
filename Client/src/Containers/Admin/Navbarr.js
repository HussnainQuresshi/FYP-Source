import React, { Component } from "react";
import Defaultlayout from "../../Adminlayout/DefaultLayout";
class Navbarr extends Component {
  render() {
    return (
      <Defaultlayout isadmin={true} {...this.props}>
        {this.props.children}
      </Defaultlayout>
    );
  }
}

export default Navbarr;
