import { create } from "zustand";
import axios from "axios";

export const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get("http://localhost:5000/api/project");
      set({ projects: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      console.error("Failed to fetch projects:", err);
    }
  },

  addProject: async (projectData) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(
        "http://localhost:5000/api/project",
        projectData
      );
      set((state) => ({
        projects: [...state.projects, res.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteProject: async (projectId) => {
    try {
      set({ loading: true, error: null });
      await axios.delete(`http://localhost:5000/api/project/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      console.error("Failed to delete project:", err);
    }
  },

  updateProject: async (projectId, updatedData) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.put(
        `http://localhost:5000/api/project/${projectId}`,
        updatedData
      );
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === projectId ? res.data : project
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
