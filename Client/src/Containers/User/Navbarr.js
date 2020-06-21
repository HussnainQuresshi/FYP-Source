import React, { Component } from "react";
import DefaultLayout from "../../Adminlayout/DefaultLayout";
class Navbarr extends Component {
  render() {
    return (
      <DefaultLayout
        userinfo={this.props.data}
        isadmin={this.props.panal || false}
        studentpanel={this.props.panal}
        {...this.props}
      >
        {this.props.children}
      </DefaultLayout>
    );
  }
}

export default Navbarr;
