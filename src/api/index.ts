import { axios } from "@/lib/axios";
import {
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  ExtractFnReturnType,
  QueryConfig,
  MutationConfig,
} from "@/lib/react-query";

export interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

export const fetchTasks = (): Promise<Task[]> => {
  return axios.get("/tasks");
};

type FetchAllQueryFnType = typeof fetchTasks;

export const useTasks = () => {
  return useQuery<ExtractFnReturnType<FetchAllQueryFnType>>({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });
};

export const fetchTask = ({
  taskId,
}: {
  taskId: string;
}): Promise<{ data: Task }> => {
  return axios.get(`/tasks/${taskId}`);
};

type QueryFnType = typeof fetchTask;

type UseTaskOptions = {
  taskId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useTask = ({ taskId, config }: UseTaskOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask({ taskId }),
    ...config,
  });
};

export type CreateTaskDTO = {
  title: string;
  description: string;
};

export const createTask = (data: CreateTaskDTO): Promise<{ data: Task }> => {
  return axios.post("/tasks", data);
};

interface EditTaskDTO extends CreateTaskDTO {
  id: string;
}

export const updateTask = (data: EditTaskDTO): Promise<{ data: Task }> => {
  return axios.patch(`/tasks/${data.id}`, data);
};

export const useCreateTask = (
  queryClient: QueryClient,
  config?: MutationConfig<typeof createTask>
) => {
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      alert("Task successfully created!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...config,
  });
};

export const useUpdateTask = (
  queryClient: QueryClient,
  config?: MutationConfig<typeof updateTask>
) => {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      alert("Task successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    ...config,
  });
};

export const toggleTaskDone = (taskId: string): Promise<{ data: Task }> => {
  return axios.patch(`/tasks/${taskId}/toggleDone`);
};

export const useToggleTaskDone = (taskId: string, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => toggleTaskDone(taskId),
    onSuccess: () => {
      alert(`Task status toggled successfully!`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const deleteTask = (taskId: string): Promise<void> => {
  return axios.delete(`/tasks/${taskId}`);
};

export const useDeleteTask = (taskId: string, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      alert(`Task deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
