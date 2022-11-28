import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';
import setFile from '../../api/setFile';
import AddTodoThunk from '../../store/thunks/AddTodoThunk';
import GetTodoThunk from '../../store/thunks/GetTodoThunk';
import CONSTANTS from '../../utils/constants';
import dayjs from "dayjs";
import "./AddTaskForm.less";

const AddTaskForm = () => {
  const { closeModal } = useContext(ModalContext);
  const [fileData, setFileData] = useState({ name: "файл не выбран" });
  const dispatch = useDispatch();

  /**
   * создаем id для нового объекта todo
   */
  const id = +dayjs().millisecond();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * Функция формирует объект данных о задаче и отправляет в базу данных
   * @param {{ name: string; description: string; }} data 
   */
  const onSubmit = (data) => {
    const date = dayjs(data.time);

    if (fileData.name !== "файл не выбран") {
      setFile(fileData)
        .then((resFile) => {

          const requestData = {
            id: id,
            name: data.name,
            time: date.$d,
            description: data.description,
            isCompleted: false,
            filePath: resFile,
            fileName: fileData.name
          };

          dispatch(AddTodoThunk(requestData))
            .then(() => {
              reset();
              closeModal(CONSTANTS.TASK_ADD__MODAL);
              dispatch(GetTodoThunk());
            })
        })
    } else {
      const requestData = {
        id: id,
        name: data.name,
        time: date.$d,
        description: data.description,
        isCompleted: data.isCompleted,
        filePath: '',
        fileName: ''
      };

      dispatch(AddTodoThunk(requestData))
        .then(() => {
          reset();
          closeModal(CONSTANTS.TASK_ADD__MODAL);
          dispatch(GetTodoThunk());
        })
    }
  };

  return (
    <div className="add-form-wrapp">
      <form action="#" className="tasks-add__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Добавить задачу</h2>

        <input
          type="string"
          className={`task-form__input ${errors.name ? 'addForm-error' : null}`}
          placeholder="Заголовок"
          {...register('name', { required: true })}
        />
        <input
          type="date"
          className={`task-form__input ${errors.time ? 'addForm-error' : null}`}
          placeholder=""
          {...register('time', { required: true })}
        />
        <textarea
          type="string"
          className="add-task-form-description"
          placeholder="Описание"
          {...register('description', { required: false })}
        />
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
          <span className="fileName">{fileData.name}</span>
        </p>
        <div className="form-btn__wrapper">
          <input type="submit" value="Создать" className="form-btn" />
          <input type="button" onClick={() => { return closeModal(CONSTANTS.TASK_ADD__MODAL); }} value="Закрыть" className="form-btn" />
        </div>
      </form>

    </div>
  )
}

export default AddTaskForm;