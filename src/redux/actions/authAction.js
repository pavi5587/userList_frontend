import axios from "axios";
import { authStart, authSuccess, authFailure } from "../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginUser = (credentials, navigate) => async (dispatch) => {
  dispatch(authStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/login`,
      credentials
    );
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", res.data.user.name);
    dispatch(authSuccess(res.data));
    toast.success("Login Successfully", { position: "top-right" });
    navigate("/userList");
  } catch (error) {
    dispatch(authFailure(error?.response?.data?.message));
    toast.error(error?.response?.data?.message, { position: "top-right" });
  }
};

export const registerUser = (data, navigate) => async (dispatch) => {
  dispatch(authStart());
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data);
    navigate("/login");
    toast.success("Registered Successfully", { position: "top-right" });
  } catch (error) {
    dispatch(authFailure(error?.response?.data?.message));
    toast.error(error?.response?.data?.message, { position: "top-right" });
  }
};
