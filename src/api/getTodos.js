import { db } from "../firebase.config";

/**
 * 
 * @returns {{description: string; fileName: string; filePath: string; id: number; isCompleted: boolean name: string; time: object; todoId: string}} response
 */

async function getTodos() {
  const response = await db.collection("todo")
    .get()
    .then(query => {
      const todos = query.docs.map(doc => ({
        todoId: doc.id,
        ...doc.data()
      }));

      return todos;
    });
  return response;
}

export default getTodos;