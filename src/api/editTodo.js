import { db } from "../firebase.config";

/**
 * 
 * @param {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; }} data 
 * @returns {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; }} data
 */

async function editTodo(data) {
    const response = await db.collection("todo").doc(data.todoId).set(data.todo);
    return data;
}

export default editTodo;


