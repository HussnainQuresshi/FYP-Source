export default {
  items: [
    {
      title: true,
      name: "Admin Dashboard",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    { divider: true },
    {
      name: "Dashboard",
      url: "/adminpanel",
      icon: "icon-speedometer"
    },
    {
      name: "Teacher",
      url: "/teachers",
      icon: "icon-user"
    },
    {
      name: "Question",
      url: "/questions",
      icon: "icon-bell"
    },
    {
      name: "Course",
      url: "/courses",
      icon: "icon-pencil"
    },
    {
      name: "Department",
      url: "/departments",
      icon: "icon-pie-chart"
    },
    {
      name: "Result",
      url: "/Results",
      icon: "icon-layers"
    },
    {
      name: "Token",
      url: "/tokens",
      icon: "icon-star"
    }
  ]
};
