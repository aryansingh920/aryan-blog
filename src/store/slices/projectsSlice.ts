// store/projectsSlice.ts (TypeScript)
// ------------------------------------------------

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProjectSection } from "@/types/types";

// The thunk for fetching the raw sections data from /projects.json
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetch("/projects.json");
    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }
    const data = (await response.json()) as ProjectSection[];
    return data; // The raw sections array
  }
);

interface ProjectsState {
  sections: ProjectSection[];
  loading: boolean;
  error: boolean;
}

const initialState: ProjectsState = {
  sections: [],
  loading: false,
  error: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<ProjectSection[]>) => {
          state.sections = action.payload;
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default projectsSlice.reducer;
