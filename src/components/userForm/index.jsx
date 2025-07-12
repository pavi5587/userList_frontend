import React, { useEffect } from "react";
import { Input, Form, Button } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/user.css";

const token = localStorage.getItem("token");

const UserForm = (props) => {
  const { type, editData, handleCancelUser, getUserData } = props;
  console.log("type", type, editData);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    if (type === "add") {
      dispatch(addUser(values, toast, handleCancelUser, getUserData));
      form.resetFields();
    } else {
      dispatch(
        editUser(editData._id, values, toast, handleCancelUser, getUserData)
      );
      form.resetFields();
    }
  };

  const handleCancel = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        images: editData.images,
      });
    }
  }, [editData, form]);
  return (
    <div>
      <Form
        form={form}
        name="userForm"
        onFinish={onFinish}
        layout="vertical"
        className="form"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
          ]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter your last name",
            },
          ]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>

        <Form.Item
          label="Profile Image URL"
          name="images"
          rules={[
            {
              required: true,
              message: "Please enter profile image link",
            },
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item className="button-form">
          <Button
            htmlType="button"
            onClick={handleCancel}
            className="button-cancel"
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
