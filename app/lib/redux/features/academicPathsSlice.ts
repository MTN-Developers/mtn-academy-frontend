// store/slices/academicPathsSlice.ts
import { AcademicPath, PaginationMeta } from "@/app/types/academic-paths";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AcademicPathsState {
  paths: AcademicPath[];
  meta: PaginationMeta | null;
  selectedPath: AcademicPath | null;
}

const initialState: AcademicPathsState = {
  paths: [],
  meta: null,
  selectedPath: null,
};

const academicPathsSlice = createSlice({
  name: "academicPaths",
  initialState,
  reducers: {
    setPaths: (
      state,
      action: PayloadAction<{ paths: AcademicPath[]; meta: PaginationMeta }>
    ) => {
      state.paths = action.payload.paths;
      state.meta = action.payload.meta;
    },
    setSelectedPath: (state, action: PayloadAction<AcademicPath | null>) => {
      state.selectedPath = action.payload;
    },
    clearPaths: (state) => {
      state.paths = [];
      state.meta = null;
    },
  },
});

export const { setPaths, setSelectedPath, clearPaths } =
  academicPathsSlice.actions;
export default academicPathsSlice.reducer;
