import { db } from "../firebase.config";

/**
 * 
 * @param {string} todoId 
 * @returns {string} todoId
 */

async function deleteTodo(todoId) {
  const res = await db.collection('todo').doc(todoId).delete()
  return todoId;
}

export default deleteTodo;