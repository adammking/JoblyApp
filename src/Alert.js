import React from "react";
import {v4 as uuid} from 'uuid';


function Alert({ type, messages }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map(error => (
        <p className="mb-0 small" key={uuid()}>
          {error}
        </p>
      ))}
    </div>
  );
}

Alert.defaultProps = {
  type: "danger",
  messages: []
};

export default Alert;
