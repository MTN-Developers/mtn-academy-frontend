import { AcademicPath, PaginationMeta } from "@/app/types/academic-paths";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AcademicPathsState {
  paths: AcademicPath[];
  meta: PaginationMeta | null;
  selectedPath: AcademicPath | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AcademicPathsState = {
  paths: [],
  meta: null,
  selectedPath: null,
  isLoading: false,
  error: null,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPaths: (state) => {
      state.paths = [];
      state.meta = null;
      state.selectedPath = null;
    },
  },
});

export const { setPaths, setSelectedPath, setLoading, setError, clearPaths } =
  academicPathsSlice.actions;
export default academicPathsSlice.reducer;
