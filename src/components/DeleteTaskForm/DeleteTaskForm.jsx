import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DeleteTodoThunk from '../../store/thunks/DeleteTodoThunk';
import { ModalContext } from '../../context/ModalContext';
import deleteFile from '../../api/deleteFile';
import CONSTANTS from '../../utils/constants';
import "./DeleteTaskForm.less";

const DeleteTaskForm = () => {
  const { closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const todos = useSelector((state) => { return state.todos; });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * 
   * @param {{name: string}} data 
   */

  const onSubmit = (data) => {
    let index = todos.findIndex(el => el.name === data.name);
    const todoId = todos[index].todoId;
    if (todos[index].fileName) {
      deleteFile(todos[index].fileName)
        .then(() => {
          dispatch(DeleteTodoThunk(todoId))
            .then(() => {
              closeModal(CONSTANTS.TASK_DELETE__MODAL);
            })
        })
    } else {
      dispatch(DeleteTodoThunk(todoId))
        .then(() => {
          closeModal(CONSTANTS.TASK_DELETE__MODAL);
        })
    }
  }

  return (
    <div className="form-wrapp">
      <form action="#" className="tasks-add__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Удалить задачу?</h2>
        <p>Введите заголовок задачи</p>
        <input
          type="string"
          className={`task-form__input ${errors.name ? 'deleteForm-error' : null}`}
          placeholder="Заголовок"
          {...register('name', { required: true })}
        />
        <div className="buttons-block">
          <input type="submit" value="Удалить" />
          <input type="button" value="Закрыть" onClick={() => { return closeModal(CONSTANTS.TASK_DELETE__MODAL); }} />
        </div>
      </form>
    </div>
  )
}

export default DeleteTaskForm;