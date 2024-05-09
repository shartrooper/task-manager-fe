import { Box, Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CreateTaskDTO,
  Task,
  useCreateTask,
  useTasks,
  useUpdateTask,
} from "@/api";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const { user } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { data: tasks, isLoading, error } = useTasks();
  const queryClient = useQueryClient();
  const createTask = useCreateTask(queryClient);
  const updateTask = useUpdateTask(queryClient);

  const handleOpenModal = (task: Task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentTask(null);
  };

  const handleSaveTask = (taskData: CreateTaskDTO) => {
    if (currentTask) {
      updateTask.mutate({ ...taskData, id: currentTask.id });
    } else {
      createTask.mutate(taskData);
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <Box sx={{ p: 3, backgroundColor: "#0D1B2A", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" color="white">
          Logged in as: {user?.name ?? ""}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Create Task
        </Button>
      </Box>
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => handleOpenModal(task)}
        />
      ))}
      <TaskModal
        open={modalOpen}
        onClose={handleModalClose}
        task={currentTask}
        onSave={handleSaveTask}
      />
    </Box>
  );
};

export default Dashboard;
