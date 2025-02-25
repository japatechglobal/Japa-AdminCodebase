import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Home from "./Components/Admin/Home";
import PostJobs from "./Components/Admin/PostJobs";
import Courses from "./Components/Admin/Courses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Talents from "./Components/Admin/Talents";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />}></Route>
          <Route path="/admin/postjob" element={<PostJobs />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/talents" element={<Talents />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
