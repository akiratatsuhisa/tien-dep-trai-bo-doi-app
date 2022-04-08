import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNotification } from "../Context/NotificationProvider";

export const Login = () => {
  const { login, loginByProvider } = useAuth();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      pushNotification({
        title: "thành công",
        content: "Bạn đã thành công đăng nhập",
        variant: "success",
      });
      return navigate("/");
    } catch (error) {
      console.error(error);
      pushNotification({
        title: "thất bại",
        content: "Bạn đã nhập sai email hoặc mật khẩu",
        variant: "danger",
      });
    }
    setLoading(false);
  };

  const loginByProviderHandle = async (e, providerName) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginByProvider(providerName);
      pushNotification({
        title: "thành công",
        content: "Bạn đã thành công đăng nhập bằng google",
        variant: "success",
      });
      return navigate("/");
    } catch (error) {
      console.error(error);
      pushNotification({
        title: "thất bại",
        content: "Bạn đã nhập sai email hoặc mật khẩu",
        variant: "danger",
      });
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col className="mx-auto" md={8}>
        <Card>
          <Card.Body>
            <Card.Title>Đăng nhập</Card.Title>
            <Form onSubmit={submitHandle}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 d-grid gap-2">
                <Button type="submit" disabled={loading} variant="primary">
                  Đăng nhập
                </Button>
                <Button
                  type="button"
                  disabled={loading}
                  variant="danger"
                  onClick={(e) => loginByProviderHandle(e, "google")}
                >
                  <i className="bi bi-google"></i>
                  <span> Đăng nhập bằng Google</span>
                </Button>
              </Form.Group>
              <span>
                Chưa có tài khoản ? Tạo tài khoản{" "}
                <Link to="/register">tại đây</Link>.
              </span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
