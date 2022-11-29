import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditTodoThunk from '../../store/thunks/EditTodoThunk';
import GetTodoThunk from '../../store/thunks/GetTodoThunk';
import setFile from '../../api/setFile';
import { ModalContext } from '../../context/ModalContext';
import CONSTANTS from '../../utils/constants';
import dayjs from "dayjs";
import "./EditTaskForm.less";

const EditTaskForm = () => {
  const { todo, closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const date = dayjs.unix(todo.time.seconds).format("YYYY-MM-DD");
  const [editedDate, setEditedDate] = useState(date);
  const [fileData, setFileData] = useState({ name: todo.fileName });
  const [prevFileData, setPrevFileData] = useState({ name: todo.fileName });
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
   * отправляет запрос в базу данных
   * @param {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; todoId: string }} request 
   */

  const SendEditedTodo = (request) => {
    dispatch(EditTodoThunk(request))
      .then(() => {

        dispatch(GetTodoThunk());
        reset();
        closeModal(CONSTANTS.TASK_EDIT__MODAL);
      })
  }

  /**
   * Функция формирует объект измененных данных о задаче 
   * @param {{ name: string; date: string; description: string; isCompleted: boolean; }} data 
   */

  const onSubmit = (data) => {
    const date = dayjs(data.date);
    let requestData;

    if (fileData.name !== "" && fileData.name !== prevFileData.name) {
      setFile(fileData)
        .then((resFile) => {
          console.log(resFile);
          requestData = {
            id: todo.id,
            name: data.name,
            time: date.$d,
            description: data.description,
            isCompleted: data.isCompleted,
            filePath: resFile,
            fileName: fileData.name,
            todoId: todo.todoId
          };

          SendEditedTodo(requestData)
        })
    } else {
      requestData = {
        id: todo.id,
        name: data.name,
        time: date.$d,
        description: data.description,
        isCompleted: data.isCompleted,
        filePath: todo.filePath,
        fileName: todo.fileName,
        todoId: todo.todoId
      };
      SendEditedTodo(requestData)
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