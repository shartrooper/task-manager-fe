import React from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal as MuiModal,
} from "@mui/material";
import { CreateTaskDTO, Task } from "@/api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (data: CreateTaskDTO) => void;
};

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  task,
  onSave,
}) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    if (task) {
      setFormData({ title: task.title, description: task.description });
    }
  }, [task]);

  const handleChange = (event: { target: { name: string; value: unknown; }; }) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return ReactDOM.createPortal(
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="task-modal-title" variant="h6" component="h2">
          {task ? "Edit Task" : "Create Task"}
        </Typography>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
        />
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
        <Button
          onClick={onClose}
          color="error"
          variant="contained"
          sx={{ mt: 2, ml: 2 }}
        >
          Close
        </Button>
      </Box>
    </MuiModal>,
    document.body
  );
};

export default TaskModal;
