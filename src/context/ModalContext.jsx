import React, { createContext, useState } from 'react';
import CONSTANTS from '../utils/constants';

export const ModalContext = createContext({
  addTaskModal: false,
  editTaskModal: false,
  todoId: '',
  deleteTaskModal: false,
  openModal: () => { },
  closeModal: () => { },
});

export const ModalState = ({ children }) => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [editTaskModal, setEditTaskModal] = useState(false);

  const openModal = (type, ...arg) => {
    switch (type) {
      case CONSTANTS.TASK_ADD__MODAL:
        setAddTaskModal(true);
        break;
      case CONSTANTS.TASK_DELETE__MODAL:
        setDeleteTaskModal(true);
        break;
      case CONSTANTS.TASK_EDIT__MODAL:
        setTodoId(arg[0]);
        setEditTaskModal(true);
        break;
      default:
        break;
    }
  };
  const closeModal = (type) => {
    switch (type) {
      case CONSTANTS.TASK_ADD__MODAL:
        setAddTaskModal(false);
        break;
      case CONSTANTS.TASK_DELETE__MODAL:
        setDeleteTaskModal(false);
        break;
      case CONSTANTS.TASK_EDIT__MODAL:
        setEditTaskModal(false);
        break;
      default:
        break;
    }
  };

  return (
    <ModalContext.Provider value={{
      todoId,
      editTaskModal,
      addTaskModal,
      deleteTaskModal,
      openModal,
      closeModal,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
};
