import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { registerAccount } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import QRCode from "qrcode";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [isQrScan, setIsQrScan] = useState(false);
  const [qrCode, setQrCode] = useState(null);

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
      .then((result) => {
        const secret = result.data.secret;

        // issuer=node44 - dat ten khi tao otp moi then google authentication
        const otpauth = `otpauth://totp/${payload.email}?secret=${secret}&issuer=node44_thanhhien_youtube`;
        QRCode.toDataURL(otpauth)
          .then((qrCodeUrl) => {
            setQrCode(qrCodeUrl);
            toast.success(result.message);
          })
          .catch();

        console.log(result);
        // toast.success(result.message);
        // navigate("/login");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const handleQrScanConfirmation = () => {
    setIsQrScan(true);
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
      {/* Hiển thị mã QR nếu có */}
      {qrCode && (
        <div className="text-center mt-4">
          <h4>Scan the QR Code with Google Authenticator</h4>
          <img src={qrCode} alt="QR Code" />
          {/* <p>Secret: {secret}</p> Có thể hiển thị secret để sao lưu */}
          <button
            onClick={handleQrScanConfirmation}
            type="button"
            className="btn btn-success mt-3"
          >
            I've Scanned the QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
