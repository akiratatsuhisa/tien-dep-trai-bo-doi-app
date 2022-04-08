import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { BaseNavbar } from "./BaseNavbar";

export const BaseLayout = () => {
  return (
    <>
      <BaseNavbar></BaseNavbar>
      <Container>
        <Outlet></Outlet>
      </Container>
    </>
  );
};
