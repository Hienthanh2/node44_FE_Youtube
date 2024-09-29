import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const login = async () => {
    const email = document.getElementById("email").value;
    const pass_word = document.getElementById("pass").value;

    loginAPI({ email, pass_word })
      .then((result) => {
        toast.success(result.message);
        localStorage.setItem("access_token", result.data);

        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button type="button" className="btn btn-primary" onClick={login}>
              Login
            </button>

            <ReactFacebookLogin
              appId="843544627974030"
              fields="name,email,picture"
              callback={(response) => {
                console.log("response: ", response);
                const { name, id, email } = response;
                loginFacebookAPI({ name, id, email })
                  .then((result) => {
                    toast.success(result.message);
                    localStorage.setItem("access_token", result.data);
                    navigate("/");
                  })
                  .catch((error) => {
                    toast.error(error.response.data.message);
                  });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
