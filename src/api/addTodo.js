import { db } from "../firebase.config";

/**
 * 
 * @param {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; }} data 
 * @returns {{ id: number; name: string; time: object; description: string; isCompleted: boolean; filePath: string; fileName: string; }} data
 */

async function addTodo(data) {
  const response = await db.collection("todo").add(data);
  return data;
}

export default addTodo;


