// // src/lib/redux/features/courseSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../axios/instance";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   videos: Video[];
//   materials: Material[];
//   quizzes: Quiz[];
// }

// interface CourseState {
//   courses: Course[];
//   currentCourse: Course | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CourseState = {
//   courses: [],
//   currentCourse: null,
//   loading: false,
//   error: null,
// };

// export const fetchCourses = createAsyncThunk(
//   "courses/fetchCourses",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/courses");
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const courseSlice = createSlice({
//   name: "courses",
//   initialState,
//   reducers: {
//     setCurrentCourse: (state, action) => {
//       state.currentCourse = action.payload;
//     },
//     clearCurrentCourse: (state) => {
//       state.currentCourse = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload;
//       })
//       .addCase(fetchCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setCurrentCourse, clearCurrentCourse } = courseSlice.actions;
// export default courseSlice.reducer;
