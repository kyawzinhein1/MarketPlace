import { Form, Input, message } from "antd";
import { loginUser, registerUser } from "../../apicalls/auth";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

const Authform = ({ isLoginPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const handleOnFinish = async (values) => {
    dispatch(setLoader(true));
    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.token));
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
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    dispatch(setLoader(false));
  };
  return (
    <section className="w-full flex mt-[100px] justify-center">
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
              disabled={isProcessing}
            >
              {isLoginPage && !isProcessing && "Login"}
              {!isLoginPage && !isProcessing && "Register"}
              {isProcessing && isLoginPage && "Logging in ..."}
              {isProcessing && !isLoginPage && "Registering ..."}
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
