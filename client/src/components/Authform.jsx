import { Button, Form, Input } from "antd";

const Authform = ({ isLoginPage }) => {
  const handleOnFinish = async (values) => {
    console.log(values);
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
                  message: "Name must be include.",
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
                message: "Email must be include.",
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
                message: "Password must be include.",
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
            >
              Register
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Authform;
