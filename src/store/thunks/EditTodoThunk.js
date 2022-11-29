import editTodo from '../../api/editTodo';
import { EditTodoAction } from '../actions/todosActions';

/**
 * 
 * @param {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; todoId: string }} data 
 */

const EditTodoThunk = (data) => {
  return async function (dispatch) {
    const response = await editTodo(data);
    dispatch(EditTodoAction(response));
  };
};

export default EditTodoThunk;