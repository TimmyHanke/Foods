import React from "react";

function FormInputSelect({
  name,
  label,
  list,
  value,
  onChange,
  error,
  placeHolder,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        <option value=""></option>
        {list.map((list) => (
          <option key={list._id} value={list._id}>
            {list.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default FormInputSelect;
