import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAPIConText } from "../../lib/context/APIContextProvider";
function Login() {
  const { state, authenticateUser } = useAPIConText();
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {
    const element = document.querySelector(
      `[name="${errorInfo.errorFields[0].name[0]}"]`
    );
    element.focus();
    alert("Nhập không đúng quy tắc");
  };
  const onGenderChange = (e) => {
    setStatus(false);
    setUser(e.target.value);
  };
  const onchanePassword = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    const element = document.querySelector("#username");
    element.focus();
  }, []);


  return (
    <Form
      onFinishFailed={onFinishFailed}
      onFinish={() => {
        authenticateUser({ email: user, password: password });
      }}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      className={`${localStorage.getItem("user") ? "hidden" : ""
        } bg-transparent rounded-md h-[500px]  w-full bg-blue-500`}
    >
      <h1 className="font-bold text-center text-[40px]">Đăng nhập</h1>
      <Form.Item
        hasFeedback={status}
        validateStatus={status ? "error" : ""} 
        
        name="username"
        rules={[
          { required: true, message: "Không được để trống!" },
          { max: 30, message: "Ít hơn 30 từ" },
          { min: 5, message: "Nhiều hơn 5 từ" },
          { whitespace: true, message: "Không được có khoảng trắng" },
        ]}
      >
        <Input
          value={"admin@gmail.com"}
          id="username"
          name="username"
          onChange={onGenderChange}
          placeholder="Tên đăng nhập"
          prefix={<UserOutlined />}
          type="text"
          className="h-[40px]"
        ></Input>
      </Form.Item>
      <Form.Item
        className=""
        name="password"
        rules={[
          { required: true, message: "Không được để trống!" },
          { min: 5, message: "Nhiều hơn 5 từ" },
          { whitespace: true, message: "Không được có khoảng trắng" },
        ]}
      >
        <Input
          onChange={onchanePassword}
          name="password"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          type="password"
          className="h-[40px]"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>
            <h6 className="text-[10px]">Nhớ mật khẩu</h6>
          </Checkbox>
        </Form.Item>
        <Link to ={"/testtoke"}className="ml-[50px] text-[10px] text-blue-700">
          Quên mật khẩu
        </Link>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="bg-black" type="primary" block>
          Login
        </Button>
        Or{" "}
        <Link to={"/signup"} className="text-blue-700">
          register now!
        </Link>
      </Form.Item>
    </Form>
  );
}
export default Login;
