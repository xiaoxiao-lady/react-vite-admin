import { LoginParams } from "@/models/login";
import { Button, Checkbox, Form, Input } from "antd";
import React, { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { useLogin } from "@/api";
import { Location } from "history";

import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";
import styles from "./index.module.less";

const initialValues: LoginParams = {
  username: "guest",
  password: "guest",
  // remember: true
};

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;

  // const dispatch = useAppDispatch();

  const onFinished = async (form: LoginParams) => {
    const result = await loginMutation.mutateAsync(form);
    console.log("result: ", result);

    if (result) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);

      const from = location.state?.from || { pathname: "/dashboard" };
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <LogoSvg className={styles.logo} />
            <span className={styles.title}>日常demo</span>
          </Link>
        </div>
        <div className={styles.desc}>全新技术栈(React\Recoil\React Query\React Hooks\Vite)的后台管理系统</div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
