import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoListItem({ id, title, onRemoveTodo }) {
  return (
    <li className={styles.listItem}>
      {title}{" "}
      <button type="button" onClick={() => onRemoveTodo(id)}>
        <FaTrash />
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
