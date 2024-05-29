import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
const Language = (props) => {
  const { i18n, t } = useTranslation();
  const hanleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language == "vi" ? "VIETNAM" : "ENGLISH"}
        id="basic-nav-dropdown"
        className="me-3"
      >
        <NavDropdown.Item onClick={() => hanleChangeLanguage("vi")}>
          VIETNAM
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => hanleChangeLanguage("en")}>
          ENGLISH
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
