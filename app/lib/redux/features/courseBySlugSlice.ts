// lib/redux/features/coursesBySlugSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { CourseDetailsResponse } from '@/app/hooks/useCourseDetails';

interface CourseState {
  item: CourseDetailsResponse['data'] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CourseState = {
  item: null,
  status: 'idle',
  error: null,
};

const courseSlice = createSlice({
  name: 'courseBySlug',
  initialState,
  reducers: {
    resetCourse: state => {
      state.item = null;
      state.status = 'idle';
      state.error = null;
    },
    setCourse: (state, action) => {
      state.item = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
  },
});

export const { resetCourse, setCourse } = courseSlice.actions;
export default courseSlice.reducer;
