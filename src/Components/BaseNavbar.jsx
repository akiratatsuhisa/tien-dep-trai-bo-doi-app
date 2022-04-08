import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNotification } from "../Context/NotificationProvider";
import logo from "../logo.svg";

export const BaseNavbar = () => {
  const navigate = useNavigate();
  const { pushNotification } = useNotification();
  const { currentUser, isLoggedIn, logout } = useAuth();

  const logoutHandle = async () => {
    try {
      await logout();
      pushNotification({
        title: "cảnh báo",
        content: "Bạn đã đăng xuất",
        variant: "warning",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="mb-3 shadow">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span>Tiến ĐTBĐ</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Diễn đàn</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>Giới thiệu</Nav.Link>
            <Nav.Link onClick={() => navigate("/game")}>Game</Nav.Link>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <Nav.Link onClick={() => navigate("/login")}>Đăng nhập</Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <>
                    <Image
                      roundedCircle
                      src={currentUser.photoURL}
                      style={{ objectFit: "cover", margin: "-2rem 0" }}
                      width="32px"
                      height="32px"
                    ></Image>
                    <span className="ms-2">{currentUser.displayName}</span>
                  </>
                }
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  Thông tin
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandle}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
