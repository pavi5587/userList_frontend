import axios from "axios";
import { userStart, userSuccess, userFailure } from "../slices/userSlice";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllUsers = (page, limit) => async (dispatch) => {
  dispatch(userStart());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user?page=${page}&limit=${limit}`,
      config
    );
    dispatch(
      userSuccess({
        users: res.data.users,
        totalUsers: res.data.totalUsers,
      })
    );
  } catch (err) {
    dispatch(userFailure(err?.response?.data?.message));
  }
};

export const addUser = (userData, toast, handleClose, refresh) => async (dispatch) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/user/add`, userData, config);
    toast.success("User added successfully");
    handleClose();
    refresh();
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
};

export const editUser = (id, userData, toast, handleClose, refresh) => async (dispatch) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/user/update/${id}`, userData, config);
    toast.success("User updated successfully");
    handleClose();
    refresh();
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
};

export const deleteUser = (id, toast, refresh) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/delete/${id}`, config);
    toast.success("User deleted successfully");
    refresh();
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
};

export const searchUser = (name) => async (dispatch) => {
  dispatch(userStart());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user?firstName=${name}`,
      config
    );
    dispatch(
      userSuccess({
        users: res.data.users,
        totalUsers: res.data.users.length,
      })
    );
  } catch (err) {
    dispatch(userFailure(err?.response?.data?.message));
  }
};
