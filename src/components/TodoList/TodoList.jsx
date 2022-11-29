import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';
import CONSTANTS from '../../utils/constants';
import TodoItem from "../TodoItem/TodoItem";
import ModalWindow from "../modalWindow/ModalWindow";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import DeleteTaskForm from "../DeleteTaskForm/DeleteTaskForm";
import "./TodoList.less";

const TodoList = () => {
  const { addTaskModal, editTaskModal, deleteTaskModal, openModal } = useContext(ModalContext);
  const todos = useSelector((state) => { return state.todos; });

  return (
    <div className="todoList__container">
      <div className="todoList">
        <button className="todoList__add-button" onClick={() => { return openModal(CONSTANTS.TASK_ADD__MODAL); }}>
          Добавить задачу
        </button>
        <div className="todoList__todos-wrap">
          {
            todos.length > 0 ?
              (todos.map((todo) => <TodoItem key={todo.id} todoId={todo.todoId} name={todo.name} time={todo.time} isComplete={todo.isCompleted} />))
              : <p className="noTodos">У вас нет запланированных задач</p>
          }
        </div>
      </div>
      {addTaskModal
        && (
          <ModalWindow type={CONSTANTS.TASK_ADD__MODAL}>
            <AddTaskForm />
          </ModalWindow>
        )
      }
      {editTaskModal
        && (
          <ModalWindow type={CONSTANTS.TASK_EDIT__MODAL}>
            <EditTaskForm />
          </ModalWindow>
        )
      }
      {deleteTaskModal
        && (
          <ModalWindow type={CONSTANTS.TASK_DELETE__MODAL}>
            <DeleteTaskForm />
          </ModalWindow>
        )
      }
    </div>
  );
}

export default TodoList;
