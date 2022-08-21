import React from "react";

function Forminput({ name, label, value, onChange, error, list, type }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        className="form-control"
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        type={type}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Forminput;
