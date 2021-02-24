import React from "react";
const AdminMainPage = ({ user }) => {
  const { id, name, email } = user || {};
  return <div className="container">hello {name}</div>;
};

export default AdminMainPage;
