import { useEffect, useRef } from "react";

const InputWithLabel = ({ id, value, onInputChange, children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
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

export default InputWithLabel;
