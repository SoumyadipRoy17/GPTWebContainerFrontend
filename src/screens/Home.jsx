import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    console.log("Project Name:", projectName);
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <main className="p-4">
        <div className="projects flex flex-wrap gap-3 ">
          <button
            className="project p-4 border border-slate-300 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-link"></i> Add Project
          </button>

          {project.map((project) => (
            <div
              key={project._id}
              className="project flex flex-col cursor-pointer  p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-300"
              onClick={() => {
                navigate(`/project/`, {
                  state: { project },
                });
              }}
            >
              <h2 className="text-lg  font-semibold">{project.name}</h2>
              <p className="text-sm text-slate-500">
                Created by: {project.createdBy}
              </p>
              <div className="flex gap-2">
                <p>
                  <small>Collaborators : </small>
                  <i className="ri-user-line"></i>{" "}
                </p>
                {project.users.length}
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Create a New Project
              </h2>
              <form onSubmit={(e) => createProject(e)}>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium mb-2"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none mb-4"
                  placeholder="Enter project name"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
