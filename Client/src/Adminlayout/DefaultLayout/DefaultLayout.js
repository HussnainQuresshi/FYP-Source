import React, { PureComponent, Suspense } from "react";

import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";

import axios from "axios";
import NotificationManager from "react-notifications";
import navigation from "../../_nav";
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
let Navigation = navigation;

class DefaultLayout extends PureComponent {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  signOut = async () => {
    await axios
      .get("/signout")
      .then((res) => {
        this.props.history.push("/");

        NotificationManager.success("Logged Out", "Successfull", 3000);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  Refresh = () => {
    if (this.props.studentpanel === true) {
      let items = (Navigation = {
        items: [
          {
            title: true,
            name: "Department",
            icon: "icon-pie-chart",
          },
          {
            name: this.props.userinfo.UserDepartment,
            icon: "icon-pie-chart",
            attributes: { disabled: true },
          },
          { divider: true },
          {
            title: true,
            name: "Semester",
            icon: "icon-layers",
          },
          {
            name: this.props.userinfo.UserSemester,
            icon: "icon-layers",
            attributes: { disabled: true },
          },
          { divider: true },
          {
            title: true,
            name: "Batch",
            icon: "icon-bell",
          },
          {
            name: this.props.userinfo.UserBatch,
            icon: "icon-bell",
            attributes: { disabled: true },
          },
          { divider: true },
          {
            title: true,
            name: "Course",
            icon: "icon-pencil",
          },
          {
            name: this.props.userinfo.UserCourse,
            icon: "icon-pencil",
            attributes: { disabled: true },
          },
          { divider: true },
          {
            title: true,
            name: "Teacher",
            icon: "icon-user",
          },
          {
            name: this.props.userinfo.UserTeacher,
            icon: "icon-user",
            attributes: { disabled: true },
          },
        ],
      });
    }
  };
  render() {
    this.Refresh();

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader {...this.props} onLogout={() => this.signOut()} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {this.props.isadmin ? (
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={Navigation} router={router} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          ) : null}
          <main className="main">
            <Container fluid>{this.props.children}</Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
