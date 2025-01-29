import styles from "./TodoListItem.module.css";
import { FaTrash } from "react-icons/fa";

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

export default TodoListItem;
