import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "../../css/login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    console.log("Received values:", values);
    dispatch(loginUser(values, navigate));
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Card className="login-card">
      <Title level={4} className="login-title ">
        LOGIN
      </Title>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <span className="a-link" onClick={() => navigate("/register")}>
            register now!
          </span>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
