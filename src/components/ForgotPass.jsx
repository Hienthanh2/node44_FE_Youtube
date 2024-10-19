import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePasswordAPI, forgotPasswordAPI } from "../utils/fetchFromAPI";

const ForgotPass = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-5" style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        {step === 0 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị state khi người dùng nhập email
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  forgotPasswordAPI(email)
                    .then((data) => {
                      toast.success(data.message);
                      setStep(1);
                    })
                    .catch((error) => {
                      console.log("error: ", error);
                      // toast.error(error.response.data.message);
                    });
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập CODE
              </label>
              <input className="form-control" id="code" />
              <label htmlFor="inputEmail4" className="form-label">
                Đổi mật khẩu
              </label>
              <input className="form-control" id="pass" />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  let code = document.querySelector("#code").value;
                  let newPassword = document.getElementById("pass").value;

                  changePasswordAPI({ email, code, newPassword })
                    .then((res) => {
                      navigate("/login");
                      toast.success(res.message);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
