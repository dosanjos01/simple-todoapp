'use client'

import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { SubmitEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/dist/client/components/navigation";
import { v4 as uuidv4 } from 'uuid';

export default function AddTask() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue('');
    setModalOpen(false);
    router.refresh();
  };

  return (
    <main className="">
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        add new task 
        <FaPlus size={16}/> </button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">add new task</h3>
            <div className="modal-action">
              <input 
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text" placeholder="Type here" className="input w-full outline-none" />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </main>
  );
}
