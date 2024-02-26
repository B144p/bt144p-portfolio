import { createSlice } from "@reduxjs/toolkit";

export type IProjectSlice = {
  selected: string | null;
};

const projectDefault: IProjectSlice = {
  selected: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState: projectDefault,
  reducers: {
    selectedProject: (state, { payload }) => {
      localStorage.setItem("project", payload);
      state.selected = payload;
    },
    unSelectedProject: (state) => {
      localStorage.removeItem("project");
      window.location.href = "/";
      state.selected = "";
    },
  },
});

export const { selectedProject, unSelectedProject } = projectSlice.actions;

export default projectSlice.reducer;
