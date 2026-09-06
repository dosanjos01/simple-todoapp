'use client'

import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { SubmitEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
 const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
 const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
 const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
 const router = useRouter();

 const handleSubmitEditTodo: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    })
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  }
  
  return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-4">
          <FiEdit onClick={() => setOpenModalEdit(true)} className="cursor-pointer text-blue-500" size={22} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">edit task</h3>
              <div className="modal-action">
                <input 
                value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                type="text" placeholder="Type here" className="input w-full outline-none" />
                <button type="submit" className="btn">Submit</button>
              </div>
            </form>
          </Modal>
          <FiTrash2 
          onClick={() => {setOpenModalDeleted(true)}}
          className="cursor-pointer text-red-500" size={22} />
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className="text-lg">are you sure you want to delete this task?</h3>
            <div className="modal-action">
              <button 
              onClick={() => handleDeleteTask(task.id)}
              className="btn">Delete</button>
            </div>
          </Modal>
        </td>
    </tr>
  )
}

export default Task;