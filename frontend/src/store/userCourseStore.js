import { create } from 'zustand';
import { persist} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer'
import { authAPI, courseAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useUserCourseStore = create(
  persist(
    immer((set) => ({
      // State
      userCourses: [],
      loading: false,
      error: null,
      
      // Fetch user courses
      fetchUserCourses: async () => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });
        try {
          const response = await authAPI.getAllUserCourses();

          if (response.data.success) {
            set((state) => {
              state.userCourses = response.data.courses;
              state.loading = false;
            });
          } else {
            set((state) => {
              state.loading = false;
              state.error = 'Failed to fetch courses';
            });
          }
        } catch (error) {
          set((state) => {
            state.loading = false;
            state.error = error.message;
          });
        }
      },

      // Clear user courses
      clearUserCourses: () => {
        set((state) => {
          state.userCourses = [];
          state.loading = false;
          state.error = null;
        });
        // Clear persisted storage after state reset
        setTimeout(() => {
          useUserCourseStore.persist.clearStorage();
        }, 0);
      },

      // Start course
      startCourse: async (id) => {
        set((state) => {
          state.loading = true;
          state.error = null;
        });
        try {
          await courseAPI.startCourse(id);

          set((state) => {
            const course = state.userCourses.find((c) => c._id === id);
            if (course) {
              course.enrollments?.forEach((e) => (e.status = 'started'));
            }
            state.loading = false;
          });

          toast.success('Course started');
        } catch (error) {
          const errorMsg = error.response?.data?.message || error.message;
          set((state) => {
            state.loading = false;
            state.error = errorMsg;
          });
          toast.error(errorMsg);
        }
      },

      userEnrollCourse: async(id)=>{
          set((state) => {
          state.loading = true;
          state.error = null;
        });
        try{
            // Call API to enroll in course
            const response = await courseAPI.enrollCourse(id);
            console.log(response);
             set((state) => {
             state.loading = false;
             state.error = null;
        });
         return response.data;

        }
        catch(error){
            const errorMsg = error.response?.data?.message || error.message;
          set((state) => {
            state.loading = false;
            state.error = errorMsg;
          });
          toast.error(errorMsg);
        }
      }
    })),
    {
      name: 'userCourse',
      partialize: (state) => ({ userCourses: state.userCourses }),
    }
  )
);


export const useCourseActions = () =>{
    const {fetchUserCourses,startCourse,clearUserCourses, userEnrollCourse}=useUserCourseStore();
    return {
        fetchUserCourses,
        startCourse,
        clearUserCourses,
        userEnrollCourse
    }
}
  

export const useCourseStates = () =>{
    const {userCourses,loading,error}=useUserCourseStore();
    return {
        userCourses,
        loading,
        error
    }
}
  
