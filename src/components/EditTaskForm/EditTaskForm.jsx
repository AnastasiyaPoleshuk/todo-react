import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditTodoThunk from '../../store/thunks/EditTodoThunk';
import GetTodoThunk from '../../store/thunks/GetTodoThunk';
import setFile from '../../api/setFile';
import { ModalContext } from '../../context/ModalContext';
import CONSTANTS from '../../utils/constants';
import dayjs from "dayjs";
import "./EditTaskForm.less";

const EditTaskForm = () => {
  const { todoId, closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const todos = useSelector((state) => { return state.todos; });

  const todoIndex = todos.findIndex(el => el.todoId === todoId);
  const todo = todos[todoIndex];
  const date = dayjs.unix(todo.time.seconds).format("DD-MM-YYYY");
  const [editedDate, setEditedDate] = useState(date);
  const [fileData, setFileData] = useState({ name: todo.fileName });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: todo.name,
      date: date,
      description: todo.description,
      isCompleted: todo.isCompleted,
    }
  });

  /**
   * 
   * @param {React.MouseEvent} e 
   */
  const SetDateValue = (e) => setEditedDate(e.target.value);

  /**
   * Функция формирует объект измененных данных о задаче и обновляет объект в базе данных
   * @param {{ name: string; date: string; description: string; isCompleted: boolean; }} data 
   */

  const onSubmit = (data) => {

    const date = dayjs(data.date);

    if (fileData) {
      setFile(fileData)
        .then((resFile) => {

          const requestData = {
            todo: {
              id: todo.id,
              name: data.name,
              time: date.$d,
              description: data.description,
              isCompleted: data.isCompleted,
              filePath: resFile,
              fileName: fileData.name
            },
            todoId
          };

          dispatch(EditTodoThunk(requestData))
            .then(() => {
              dispatch(GetTodoThunk());
              reset();
              closeModal(CONSTANTS.TASK_EDIT__MODAL);
            })
        })
    }
  };

  return (
    <div className="edit-form__wrapp">
      <form action="#" className="tasks-edit__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Изменить задачу</h2>

        <input
          type="string"
          name="name"
          className={`edit-task-form__input ${errors.name ? 'input-error' : null}`}
          {...register('name', { required: true })}
        />
        <label htmlFor="date" className={`edit-task-form__label ${errors.date ? 'input-error' : null}`}>
          {editedDate}
          <input
            type="date"
            name="date"
            id="date"
            onInput={SetDateValue}
            {...register('date', { required: true })}
          />
        </label>

        <textarea
          type="string"
          name="description"
          className="edit-task-form-description"
          {...register('description', { required: false })}
        />
        <label className="task-form__p">
          <input type="checkbox"
            name="isCompleted"
            className="task-form__checkbox"
            {...register('isCompleted', { required: false })}
          />
          <span>Задача выполнена?</span>

        </label>
        <p className="task-form__p">
          <input
            name="file"
            type="file"
            id="file"
            onInput={(e) => { setFileData(e.target.files[0]) }}
            className="inputfile"
            {...register('file', { required: false })}
          />
          <label className="label" htmlFor="file">Выбрать файл</label>
          <a target="blank" className="fileName" href={todo.filePath}> {fileData.name}</a>
        </p>
        <div className="form-btn__wrapper">
          <input type="submit" value="Изменить" className="form-btn" />
          <input type="button" onClick={() => { return closeModal(CONSTANTS.TASK_EDIT__MODAL); }} value="Закрыть" className="form-btn" />
        </div>
      </form>
    </div>
  )
}

export default EditTaskForm;