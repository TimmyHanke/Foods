import { isEmpty } from "lodash";
import React from "react";

function Forminput({ name, label, value, onChange, error, list, type }) {
  let input = !isEmpty(list) ? [{}, ...list] : "";

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {!isEmpty(input) && type === "form-select" ? (
        <select
          className={type}
          onChange={onChange}
          value={value}
          id={name}
          name={name}
          list={list}
        >
          {input.map((input) => (
            <option key={input._id}>{input.name}</option>
          ))}
        </select>
      ) : (
        <input
          className={type}
          onChange={onChange}
          value={value}
          id={name}
          name={name}
        />
      )}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Forminput;
