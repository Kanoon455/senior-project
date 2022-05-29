import React from "react";
import Form from "react-bootstrap/Form";

export default function blank() {
  return (
    <div>
        <br/>
      <Form.Control
        className="container"
        type="text"
        placeholder="Normal text"
      />
    </div>
  );
}
