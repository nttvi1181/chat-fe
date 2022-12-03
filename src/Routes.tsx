import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "@/page/login/Login";
import Register from "@/page/register/Register";
import Home from "@/page/home/Home";
import Socket from "./components/common/Socket";
import { Spin } from "antd";
import useUi from "@/hooks/useUi";
import { FiDownload } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { dowloadFile } from "@/utils/helper";
import VerifyContainer from "@/container/VerifyContainer";

function Main() {
  const { loading, imagePreview, setImagePreview } = useUi();
  return (
    <>
      {loading && (
        <div className="fixed w-screen h-screen flex items-center justify-center z-10 bg-gray-400 bg-opacity-75">
          <Spin />
        </div>
      )}
      {imagePreview && (
        <div className="fixed w-screen h-screen flex items-center justify-center z-10 bg-gray-700 bg-opacity-75">
          <div
            style={{
              maxWidth: "80vw",
              maxHeight: "80vh",
              position: "relative",
            }}
          >
            <div className="absolute flex text-3xl -top-12 right-0">
              <FiDownload
                className="mr-4 cursor-pointer"
                onClick={() => dowloadFile(imagePreview)}
              />
              <AiFillCloseCircle
                className="cursor-pointer"
                onClick={() => setImagePreview("")}
              />
            </div>
            <img
              style={{ maxWidth: "80vw", maxHeight: "80vh" }}
              src={imagePreview}
            />
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Socket />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyContainer />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Main;
