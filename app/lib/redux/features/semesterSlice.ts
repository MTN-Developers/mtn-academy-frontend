// // src/lib/redux/features/semesterSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../axios/instance";

// interface Semester {
//   id: string;
//   title: string;
//   courses: string[]; // Course IDs
//   startDate: string;
//   endDate: string;
// }

// interface SemesterState {
//   semesters: Semester[];
//   currentSemester: Semester | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SemesterState = {
//   semesters: [],
//   currentSemester: null,
//   loading: false,
//   error: null,
// };

// export const fetchSemesters = createAsyncThunk(
//   "semesters/fetchSemesters",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/semesters");
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const semesterSlice = createSlice({
//   name: "semesters",
//   initialState,
//   reducers: {
//     setCurrentSemester: (state, action) => {
//       state.currentSemester = action.payload;
//     },
//     clearCurrentSemester: (state) => {
//       state.currentSemester = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSemesters.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSemesters.fulfilled, (state, action) => {
//         state.loading = false;
//         state.semesters = action.payload;
//       })
//       .addCase(fetchSemesters.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setCurrentSemester, clearCurrentSemester } =
//   semesterSlice.actions;
// export default semesterSlice.reducer;
