import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';
import EditTodoThunk from '../../store/thunks/EditTodoThunk';
import dayjs from "dayjs";
import CONSTANTS from '../../utils/constants';
import "./TodoItem.less";

const TodoItem = (props) => {
  const { openModal } = useContext(ModalContext);
  const { name, time, isComplete, todoId } = props;
  const [checked, setChecked] = useState(isComplete);
  const dispatch = useDispatch();
  const todos = useSelector((state) => { return state.todos; });

  useEffect(() => {
    const dateNow = new Date();

    if (Date.parse(dateNow) > time.seconds * 1000 && checked !== true) {
      handler();
    }
  }, [time]);

  /**
   * функция преобразует число секунд в строку даты формата DD-MM-YYYY
   * @returns string
   */
  const parsTime = () => {
    const date = dayjs.unix(time.seconds).format("DD-MM-YYYY");
    return date;
  }
  
  /**
   * 
   * @param  {...string} args 
   * @returns {{id: number, name: string, time: date, description: string, isCompleted: boolean, filePath: string, fileName: string, todoId: string }}
   */

  const getCurrentTodo = (...args) => {
    let index = todos.findIndex(el => el.todoId === todoId);
    const todo = todos[index];
    if (args[0]) {
      openModal(args[0], todo)
    }
    return todo;
  }

  useEffect(() => {
    const todo = getCurrentTodo();
    setChecked(todo.isCompleted);
  }, [getCurrentTodo().isCompleted])

  /**
   * Функция отслеживает изменения значения checkbox и загружает соответствующее значение в базу данных
   */
  const handler = () => {
    setChecked(!checked);
    const todo = getCurrentTodo();
    const requestData = {
      id: todo.id,
      name,
      time,
      description: todo.description,
      isCompleted: !isComplete,
      filePath: todo.filePath,
      fileName: todo.fileName,
      todoId
    }
    dispatch(EditTodoThunk(requestData))
  };

  return (
    <div className={`todoItem ${checked ? 'completed' : null}`} >
      <input type="checkbox" className="todoItem__complete" checked={checked} onChange={() => handler()} />
      <h2 className="todoItem__name" onClick={() => { return getCurrentTodo(CONSTANTS.TASK_EDIT__MODAL); }}>{name}</h2>
      <h2 className="todoItem__time">{parsTime()}</h2>
      <div className="todoItem__buttons-block">
        <button className="todoItem__remove" onClick={() => { return getCurrentTodo(CONSTANTS.TASK_DELETE__MODAL); }}>&#10006;</button>
      </div>
    </div>
  );
}

export default TodoItem;
