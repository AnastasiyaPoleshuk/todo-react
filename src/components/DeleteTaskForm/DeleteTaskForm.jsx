import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import DeleteTodoThunk from '../../store/thunks/DeleteTodoThunk';
import { ModalContext } from '../../context/ModalContext';
import deleteFile from '../../api/deleteFile';
import CONSTANTS from '../../utils/constants';
import "./DeleteTaskForm.less";

const DeleteTaskForm = () => {
  const { todo, closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm();

  /**
   * 
   * @param {{name: string}} data 
   */

  const onSubmit = (data) => {
    if (todo.name !== data.name) {
      setError(true);
      return;
    };
    

    if (todo.fileName) {
      deleteFile(todo.fileName)
        .then(() => {
          dispatch(DeleteTodoThunk(todo.todoId))
            .then(() => {
              closeModal(CONSTANTS.TASK_DELETE__MODAL);
              setError(false);
            })
        })
    } else {
      dispatch(DeleteTodoThunk(todo.todoId))
        .then(() => {
          closeModal(CONSTANTS.TASK_DELETE__MODAL);
          setError(false);
        })
    }
  }

  return (
    <div className="form-wrapp">
      <form action="#" className="tasks-add__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Удалить задачу?</h2>
        <p>Для удаления введите {todo.name}</p>
        <input
          type="string"
          className={`task-form__input ${error ? 'deleteForm-error' : null}`}
          placeholder="Заголовок"
          {...register('name', { required: true })}
        />
        {
          error && <p className="error-message">*не верное название </p>
        }
        <div className="buttons-block">
          <input type="submit" value="Удалить" />
          <input type="button" value="Закрыть" onClick={() => { return closeModal(CONSTANTS.TASK_DELETE__MODAL); }} />
        </div>
      </form>
    </div>
  )
}

export default DeleteTaskForm;