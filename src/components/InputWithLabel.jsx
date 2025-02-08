import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const InputWithLabel = ({ id, value, onInputChange }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}></label>
      <input
        id={id}
        type="text"
        placeholder="Add a new task"
        value={value}
        onChange={onInputChange}
        ref={inputRef}
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
