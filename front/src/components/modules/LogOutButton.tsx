import React from "react";
import Button from "components/atoms/Button";

const LogOutButton = (props: any) => {
  return <Button onClick={props.onClick} name="Logout" />;
};

export default LogOutButton;
