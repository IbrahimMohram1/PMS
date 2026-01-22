import { useEffect, useState } from "react";
import { DndContext, closestCorners, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasksApi } from "../../Hooks/useTasks";

const columns = [
  { id: "ToDo", title: "Todo" },
  { id: "InProgress", title: "In Progress" },
  { id: "Done", title: "Done" },
];

function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="
      p-2.5
      m-4
      bg-[#EF9B28]
      dark:bg-[#3f718c]
      rounded-md
      cursor-grab
      border
      border-gray-300
    "
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </div>
  );
}

function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-h-[400px] bg-[#2e6459e5] dark:bg-[#adc2bfe5] p-4 rounded-lg"
    >
      <h3 className="text-white">{column.title}</h3>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}

// البورد كله
export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const { data, tasksEmployee, ChangeTaskStatus } = useTasksApi();

  // هات التاسكات أول ما الصفحة تفتح
  useEffect(() => {
    tasksEmployee();
  }, []);

  // خزن الداتا في state
  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  // Drag End
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    let newStatus;

    // IF Drop it at column
    const column = columns.find((c) => c.id === over.id);
    if (column) {
      newStatus = column.id;
    } else {
      // IF Drop it to  another Task

      const overTask = tasks.find((t) => t.id === over.id);
      newStatus = overTask?.status;
    }

    if (!newStatus || newStatus === activeTask.status) return;

    // Update UI (Optimistic Update)
    setTasks((prev) =>
      prev.map((t) => (t.id === activeId ? { ...t, status: newStatus } : t)),
    );

    // Call API
    try {
      await ChangeTaskStatus(activeId, newStatus);
      console.log("✅ Status updated:", newStatus);
    } catch (err) {
      console.error("❌ Failed:", err);

      // Rollback
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: activeTask.status } : t,
        ),
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-3 p-5">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
