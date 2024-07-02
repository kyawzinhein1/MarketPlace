import { Form, Input, message } from "antd";
import { loginUser, registerUser } from "../apicalls/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/slices/userSlice";

const Authform = ({ isLoginPage }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnFinish = async (values) => {
    setSubmitting(true);
    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUserId(response.token));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    setSubmitting(false);
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[330px] rounded-md">
        <h1 className="text-center font-bold text-3xl text-blue-500 mb-3">
          POINT.IO - {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name must contains.",
                },
                {
                  min: 3,
                  message: "Name must have 3 characters.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="name ..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Email must contain.",
              },
              {
                type: "email",
                message: "Enter a valid E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email ..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password must contain.",
              },
              {
                min: 5,
                message: "Password must have 5 characters.",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password ..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full outline-none bg-blue-500 text-white py-1 rounded-md"
              disabled={submitting}
            >
              {isLoginPage && !submitting && "Login"}
              {!isLoginPage && !submitting && "Register"}
              {submitting && "Submitting"}
            </button>
          </Form.Item>
          {isLoginPage ? (
            <p>
              Don't have an account ?
              <Link
                to={"/register"}
                className="font-medium text-blue-600 hover:text-blue-600"
              >
                {" "}
                Register here
              </Link>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <Link
                to={"/login"}
                className="font-medium text-blue-600 hover:text-blue-600"
              >
                {" "}
                Login here
              </Link>
            </p>
          )}
        </Form>
      </div>
    </section>
  );
};

export default Authform;
