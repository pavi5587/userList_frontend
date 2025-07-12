import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../../css/register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Form values:", values);
    dispatch(registerUser(values, navigate));
  };

  return (
    <Card className="register-card">
      <Title level={4} className="register-title">
        REGISTER
      </Title>
      <Form
        form={form}
        name="register_form"
        layout="vertical"
        onFinish={onFinish}
        className="register-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            {
              pattern: /^\d{10}$/,
              message: "Mobile number must be 10 digits",
            },
          ]}
        >
          <Input placeholder="10-digit Mobile Number" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Register;
