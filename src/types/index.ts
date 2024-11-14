import { z } from "zod";

// Auth & Users
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
  token: z.string()
});

export type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;

export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "passwordConfirmation"
>;

export type RequestConfirmationCodeForm = Pick<Auth, "email">;

export type ForgotPasswordForm = Pick<Auth, "email">;

export type NewPasswordForm = Pick<Auth, "password" | "passwordConfirmation">;

export type ConfirmToken = Pick<Auth, "token">;

// Projects
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string()
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true
  })
);

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;

// Tasks
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed"
]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string()
});

export type TaskStatus = z.infer<typeof taskStatusSchema>;

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = Pick<Task, "name" | "description">;
