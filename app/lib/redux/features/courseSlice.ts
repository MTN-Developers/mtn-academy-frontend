// lib/redux/features/coursesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Course, CoursesMetadata, CoursesResponse } from '@/types/course';
import axiosInstance from "@/app/lib/axios/instance";
import { endpoints } from "@/app/utils/endpoints";
import { Course, CoursesMetadata, CoursesResponse } from "@/app/types/course";

interface CoursesState {
  items: Course[];
  metadata: CoursesMetadata | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
}

const initialState: CoursesState = {
  items: [],
  metadata: null,
  status: "idle",
  error: null,
  currentPage: 1,
};

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk<
  CoursesResponse,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  "courses/fetchCourses",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<CoursesResponse>(
        `${endpoints.getAllCourses}?page=${page}&limit=${limit}`
      );

      // Add validation for the response
      if (!response.data?.data?.data) {
        throw new Error("Invalid response format");
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetCourses: (state) => {
      state.items = [];
      state.metadata = null;
      state.status = "idle";
      state.error = null;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data.data;
        state.metadata = action.payload.data.meta;
        state.currentPage = action.payload.data.meta.page;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch courses";
      });
  },
});

// Export actions
export const { resetCourses } = coursesSlice.actions;

// Export selectors
export const selectAllCourses = (state: { courses: CoursesState }) =>
  state.courses.items;
export const selectCoursesStatus = (state: { courses: CoursesState }) =>
  state.courses.status;
export const selectCoursesError = (state: { courses: CoursesState }) =>
  state.courses.error;
export const selectCoursesMetadata = (state: { courses: CoursesState }) =>
  state.courses.metadata;
export const selectCurrentPage = (state: { courses: CoursesState }) =>
  state.courses.currentPage;

export default coursesSlice.reducer;
