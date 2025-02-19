// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/user.context";
// import axios from "../config/axios";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const { user } = useContext(UserContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projectName, setProjectName] = useState("");
//   const [project, setProject] = useState([]);

//   const navigate = useNavigate();

//   function createProject(e) {
//     e.preventDefault();
//     console.log("Project Name:", projectName);
//     axios
//       .post("/projects/create", { name: projectName })
//       .then((res) => {
//         console.log(res);
//         setIsModalOpen(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   useEffect(() => {
//     axios
//       .get("/projects/all")
//       .then((res) => {
//         setProject(res.data.projects);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <>
//       <main className="p-6 bg-gray-100 min-h-screen">
//         <div className="projects flex flex-wrap gap-4">
//           <button
//             className="project flex items-center gap-2 p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:bg-gray-200 transition"
//             onClick={() => setIsModalOpen(true)}
//           >
//             <i className="ri-add-line text-xl"></i> Add Project
//           </button>

//           {project.map((project) => (
//             <div
//               key={project._id}
//               className="project flex flex-col cursor-pointer p-5 border border-gray-300 rounded-lg min-w-52 bg-white shadow-md hover:bg-gray-100 transition"
//               onClick={() => {
//                 navigate(`/project/`, {
//                   state: { project },
//                 });
//               }}
//             >
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {project.name}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Created by: {project.createdBy}
//               </p>
//               <div className="flex items-center gap-2 mt-2 text-gray-600">
//                 <i className="ri-user-line text-lg"></i>
//                 <span className="text-sm">
//                   Collaborators: {project.users.length}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                 Create a New Project
//               </h2>
//               <form onSubmit={(e) => createProject(e)}>
//                 <label
//                   htmlFor="projectName"
//                   className="block text-sm font-medium mb-2 text-gray-700"
//                 >
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   id="projectName"
//                   value={projectName}
//                   onChange={(e) => setProjectName(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none mb-4 text-gray-800"
//                   placeholder="Enter project name"
//                   required
//                 />
//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                   >
//                     Create
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </main>
//     </>
//   );
// };

// export default Home;
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  // function createProject(e) {
  //   e.preventDefault();
  //   axios
  //     .post("/projects/create", { name: projectName })
  //     .then((res) => {
  //       setIsModalOpen(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   axios
  //     .get("/projects/all")
  //     .then((res) => {
  //       setProject(res.data.projects);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  async function createProject(e) {
    e.preventDefault();

    try {
      const res = await axios.post("/projects/create", { name: projectName });

      // Close the modal after successful project creation
      setIsModalOpen(false);

      // Instead of making another GET request, update the state directly
      setProject((prevProjects) => [...prevProjects, res.data.project]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    const token = localStorage.getItem("token"); // Retrieve token from storage
    axios
      .get("/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      })
      .then(() => {
        setUser(null);
        setProject([]); // Clear projects on logout
        localStorage.removeItem("token"); // Remove stored token
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   axios
  //     .get("/projects/all")
  //     .then((res) => {
  //       setProject(res.data.projects);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from storage

    axios
      .get("/projects/all", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      })
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <main className="p-6 bg-gray-100 min-h-screen">
        <div className="projects flex flex-wrap gap-4">
          <button
            className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:bg-gray-200 transition"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-add-line text-xl"></i> Add Project
          </button>

          {project.map((project) => (
            <div
              key={project._id}
              className="flex flex-col cursor-pointer p-5 border border-gray-300 rounded-lg min-w-52 bg-white shadow-md hover:bg-gray-100 transition"
              onClick={() => {
                navigate(`/project/`, { state: { project } });
              }}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {project.name}
              </h2>
              <p className="text-sm text-gray-500">
                Created by: {project.createdBy}
              </p>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <i className="ri-user-line text-lg"></i>
                <span className="text-sm">
                  Collaborators: {project.users.length}
                </span>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Create a New Project
              </h2>
              <form onSubmit={(e) => createProject(e)}>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none mb-4 text-gray-800"
                  placeholder="Enter project name"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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
