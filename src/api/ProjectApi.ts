import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  Project,
  ProjectFormData
} from "@/types/index";

type ProjectApiType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post<string>("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjects() {
  try {
    const token = localStorage.getItem("UPTASK_2024_AUTH_TOKEN");

    const { data } = await api.get("/projects", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const response = dashboardProjectSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjectById(id: Project["_id"]) {
  try {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProject({ formData, projectId }: ProjectApiType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
