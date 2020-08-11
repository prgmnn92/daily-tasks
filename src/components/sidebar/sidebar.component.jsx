import React from "react";

import Footer from "../footer/footer.component";
import TaskInput from "../taskinput/taskinput.component";

import "./sidebar.styles.scss";

const Sidebar = (props) => (
  <div className="sidebar">
    <h1 className="sidebar__header">Daily Tasks</h1>
    <TaskInput {...props} />
    <Footer />
  </div>
);

export default Sidebar;
