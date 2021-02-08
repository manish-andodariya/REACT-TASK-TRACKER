import React from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, isAddOpen }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button text={isAddOpen ? "Close" : "Add"} onAdd={onAdd} />
      )}
    </header>
  );
};

export default Header;
