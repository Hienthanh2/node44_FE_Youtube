import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { registerAccount } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleRegister = () => {
    const payload = {
      full_name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      pass_word: document.getElementById("pass").value,
    };

    registerAccount(payload)
      .then((data) => {
        console.log(data);
        toast.success(data.message);
        navigate("/login");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          {/* full name */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Full name
            </label>
            <input className="form-control" id="fullName" />
          </div>

          {/* email */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          {/* password */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>

          {/* sign up button */}
          <div className="col-12">
            <button
              onClick={handleRegister}
              type="button"
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
