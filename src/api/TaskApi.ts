import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "../types";

type TaskApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
};

export async function createTask({
  formData,
  projectId
}: Pick<TaskApi, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTaskById({
  projectId,
  taskId
}: Pick<TaskApi, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
