import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";

import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

const Header = ({ t }: any) => {
  const [visible, setVisibility] = useState(false);
  const location = useLocation(); // Use the useLocation hook here

  const showDrawer = () => setVisibility(!visible);
  const onClose = () => setVisibility(!visible);

  const scrollTo = (id: string) => {
    if (location.pathname === "/home") {
      // Only scroll if we're on the homepage
      const element = document.getElementById(id) as HTMLDivElement;
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      // Navigate to /home for scrolling or to specific paths directly
      window.location.href = `/home#${id}`; // This approach will cause a full page reload
    }
    setVisibility(false); // Close the mobile menu drawer
  };

  const MenuItem = () => {
    return (
      <>
        <CustomNavLinkSmall>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Span>{t("Home")}</Span>
          </Link>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
          <Span>{t("Subjects")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall>
          <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Span>{t("Book Tutor")}</Span>
          </Link>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("contact")}>
        <Button>{t("⠀⠀Become A Wizard!⠀⠀")}</Button>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="image2vector.svg" width="101px" height="101px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
