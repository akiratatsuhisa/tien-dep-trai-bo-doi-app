import { Button, Image } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";

export const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1 className="h2">Thông tin tài khoản</h1>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="h3">Ảnh đại diện</h2>
        <Button variant="primary">Đổi ảnh đại diện</Button>
      </div>
      <div>
        <Image
          className="d-block mx-auto shadow"
          roundedCircle
          src={currentUser.photoURL}
          style={{ objectFit: "cover" }}
          width="200px"
          height="200px"
        ></Image>
      </div>
      <hr />
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h2 className="h3">Chi tiết</h2>
        <Button variant="primary">Chỉnh sửa</Button>
      </div>
      <div className="text-center text-md-start">
        <div>
          <span>
            Tên hiển thị <strong>{currentUser.displayName}</strong>
          </span>
        </div>
        <div>
          <span>
            Email <strong>{currentUser.email}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
