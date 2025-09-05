/** @format */

import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const searchSchema = z.object({
  search: z.string().min(1, "Search keyword is required"),
});

export const newPropertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
});
