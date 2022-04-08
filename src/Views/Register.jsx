import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNotification } from "../Context/NotificationProvider";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../firebase";
import {
  generateAvatar,
  getAvatarText,
  getFontColorByBackgroundColor,
  randomColorHex,
} from "../Services/Avatar.service";

export const Register = () => {
  const { register, updateUserProfile } = useAuth();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !form.displayName ||
      !form.email ||
      form.password.length < 6 ||
      form.password !== form.confirmPassword
    ) {
      pushNotification({
        title: "cảnh cáo",
        content: "Bạn đã nhập thiếu hoặc sai",
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const userCredential = await register(form.email, form.password);
      pushNotification({
        title: "thành công",
        content: "Bạn đã thành công đăng ký và đăng nhập",
        variant: "success",
      });

      const imageRef = ref(
        storage,
        `users/${userCredential.user.uid}/avatar.png`
      );
      const bgColor = randomColorHex();

      const blob = await new Promise((resolve) =>
        generateAvatar(
          getAvatarText(form.displayName),
          getFontColorByBackgroundColor(bgColor),
          bgColor
        ).toBlob(async (blob) => resolve(blob), "image/png")
      );

      await uploadBytes(imageRef, blob);
      const pathReference = await getDownloadURL(imageRef);
      await updateUserProfile({
        displayName: form.displayName,
        photoURL: pathReference,
      });
      return navigate("/");
    } catch (error) {
      console.error(error);
      pushNotification({
        title: "lỗi",
        content: "Bạn đã thành công trong việc hack não server",
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
            <Card.Title>Đăng ký</Card.Title>
            <Form onSubmit={submitHandle}>
              <Form.Group className="mb-3">
                <Form.Label>Tên hiển thị</Form.Label>
                <Form.Control
                  name="displayName"
                  type="text"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
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
              <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 d-grid">
                <Button type="submit" disabled={loading} variant="primary">
                  Tạo
                </Button>
              </Form.Group>
              <span>
                Đã có tài khoản rồi quay về <Link to="/login">đăng nhập</Link>.
              </span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
