import { useDeleteTask, useToggleTaskDone, Task } from "@/api";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type TaskCardProps = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleDone: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleDone,
}) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        backgroundColor: task.isDone ? "#e0e0e0" : "#fff",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" onClick={onDelete}>
          Delete
        </Button>
        <Button size="small" onClick={onToggleDone} disabled={task.isDone}>
          {task.isDone ? "Done" : "Mark as Done"}
        </Button>
      </CardActions>
    </Card>
  );
};

const TaskCardContainer: React.FC<{ task: Task; onEdit: () => void }> = ({
  task,
  onEdit,
}) => {
  const queryClient = useQueryClient();
  const deleteTask = useDeleteTask(task.id, queryClient);
  const toggleTaskDone = useToggleTaskDone(task.id, queryClient);

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    deleteTask.mutate();
  };

  const handleToggleDone = () => {
    toggleTaskDone.mutate();
  };

  return (
    <TaskCard
      task={task}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleDone={handleToggleDone}
    />
  );
};

export default TaskCardContainer;
