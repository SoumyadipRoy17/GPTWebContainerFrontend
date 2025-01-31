import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Project = ({ navigate }) => {
  const location = useLocation();

  console.log(location.state);
  return <main></main>;
};

export default Project;
