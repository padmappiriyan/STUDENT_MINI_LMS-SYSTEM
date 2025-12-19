# 🚀 Quick Reference Guide - Zustand Stores

## How to Use the Stores

### 1. Using courseStore

```javascript
import { useCourseStore } from '../../store/courseStore';

function MyComponent() {
  const { 
    courses,              // Array of all courses
    currentCourse,        // Single course being edited
    isLoading,            // API call in progress?
    error,                // Error message if any
    fetchCourses,         // Get all courses
    fetchCourseById,      // Get single course
    createCourse,         // Create new course
    updateCourse,         // Update existing course
    deleteCourse,         // Delete course
    startCourse,          // Start enrollment
  } = useCourseStore();

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  // Create course
  const handleCreate = async (courseData) => {
    try {
      await createCourse(courseData);
      // Success! Store updated automatically
    } catch (err) {
      // Error handled by store (toast shown)
    }
  };

  // Delete course
  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      // Success! Removed from store automatically
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {courses.map(course => (
        <div key={course._id}>
          {course.title}
          <button onClick={() => handleDelete(course._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
```

---

### 2. Using lessonStore

```javascript
import { useLessonStore } from '../../store/lessonStore';

function LessonComponent() {
  const {
    lessons,              // Array of lessons
    currentLesson,        // Single lesson
    isLoading,            // API call in progress?
    error,                // Error message
    fetchLesson,          // Get lesson
    createLesson,         // Create lesson
    updateLesson,         // Update lesson
    deleteLesson,         // Delete lesson
  } = useLessonStore();

  // Create lesson
  const handleAddLesson = async (e) => {
    e.preventDefault();
    await createLesson({
      title: 'New Lesson',
      content: 'Content here',
      courseId: courseId,
    });
    // Success! Lesson added to store
  };

  // Delete lesson
  const handleRemoveLesson = async (lessonId) => {
    await deleteLesson(lessonId);
    // Success! Lesson removed from store
  };

  return (
    <>
      <button onClick={handleAddLesson}>Add Lesson</button>
      {lessons.map(lesson => (
        <div key={lesson._id}>
          {lesson.title}
          <button onClick={() => handleRemoveLesson(lesson._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
```

---

### 3. Using quizStore

```javascript
import { useQuizStore } from '../../store/quizStore';

function QuizComponent() {
  const {
    currentQuiz,          // Quiz being edited
    isLoading,            // API call in progress?
    error,                // Error message
    fetchQuiz,            // Get quiz
    createQuiz,           // Create quiz
    submitQuiz,           // Submit quiz (student)
    fetchAttempts,        // Get my quiz attempts
  } = useQuizStore();

  // Create/Save quiz
  const handleSaveQuiz = async (quizData) => {
    try {
      await createQuiz(quizData);
      // Success! Quiz saved
      navigate(-1);
    } catch (err) {
      // Error shown via toast
    }
  };

  // Submit quiz
  const handleSubmit = async (answers) => {
    try {
      const result = await submitQuiz({
        quizId: quizId,
        answers: answers,
      });
      // Result returned with score
      console.log('Score:', result.score);
    } catch (err) {
      // Error shown via toast
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <h2>{currentQuiz?.title}</h2>
      {/* Quiz form */}
    </>
  );
}
```

---

## Common Patterns

### Pattern 1: Fetch Data on Mount
```javascript
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    await fetchCourses();
  } catch (error) {
    // Error already shown via toast
  }
};
```

### Pattern 2: CRUD Operation with Error Handling
```javascript
const handleCreate = async (data) => {
  try {
    await createCourse(data);
    // Auto-navigates or resets form
    navigate('/admin/courses');
  } catch (error) {
    // Error shown via store's toast
    // User sees: "Failed to create course"
  }
};
```

### Pattern 3: Conditional Rendering
```javascript
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorDisplay message={error} />;
if (!currentCourse) return <NotFound />;

return <CourseDetails course={currentCourse} />;
```

### Pattern 4: Form with Loading State
```javascript
<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Title" required />
  <textarea placeholder="Description" required />
  <button disabled={isLoading}>
    {isLoading ? 'Saving...' : 'Save Course'}
  </button>
</form>
```

---

## What NOT to Do ❌

### ❌ Don't import API directly
```javascript
// WRONG - Don't do this!
import { courseAPI } from '../../services/api';
const course = await courseAPI.getCourseById(id);
```

### ✅ Do use the store instead
```javascript
// RIGHT - Use store!
import { useCourseStore } from '../../store/courseStore';
const { fetchCourseById } = useCourseStore();
await fetchCourseById(id);
```

---

### ❌ Don't manage API loading state
```javascript
// WRONG - Don't do this!
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
setLoading(true);
// ... api call ...
setLoading(false);
```

### ✅ Let the store handle it
```javascript
// RIGHT - Store manages it!
const { isLoading, error } = useCourseStore();
// These update automatically!
```

---

### ❌ Don't handle errors manually
```javascript
// WRONG - Don't do this!
try {
  await courseAPI.createCourse(data);
  toast.success('Created!');
} catch (error) {
  toast.error('Failed');
}
```

### ✅ Store handles it automatically
```javascript
// RIGHT - Store shows toast!
try {
  await createCourse(data);
  // Toast shown automatically by store
} catch (error) {
  // Toast already shown by store
}
```

---

## Store State Structure

### courseStore
```javascript
{
  courses: [],              // Array of course objects
  currentCourse: null,      // Currently selected course
  isLoading: false,         // Boolean: API call in progress
  error: null,              // String: error message or null
}
```

### lessonStore
```javascript
{
  lessons: [],              // Array of lesson objects
  currentLesson: null,      // Currently selected lesson
  isLoading: false,         // Boolean: API call in progress
  error: null,              // String: error message or null
}
```

### quizStore
```javascript
{
  quizzes: [],              // Array of quiz objects
  currentQuiz: null,        // Currently selected quiz
  attempts: [],             // User's quiz attempts
  isLoading: false,         // Boolean: API call in progress
  error: null,              // String: error message or null
}
```

---

## Debugging Tips

### 1. Check store state in console
```javascript
import { useCourseStore } from '../../store/courseStore';

// In component
const store = useCourseStore.getState();
console.log('Current store:', store);
// Shows all state and actions
```

### 2. Check localStorage persistence
```javascript
// Open DevTools > Application > localStorage
// Look for these keys:
- course-store
- auth-store
- admin-store
```

### 3. Monitor API calls
```javascript
// Open DevTools > Network tab
// All API calls should use:
// Authorization: Bearer [token]
// Base URL: http://localhost:5001/api
```

### 4. Watch for infinite loops
```javascript
// If store keeps fetching, check:
// - useEffect dependencies are correct
// - You're not calling fetch in render
// - You have proper error handling
```

---

## Performance Tips

### 1. Use Selectors for Specific State
```javascript
// ✅ Good - Only subscribes to courses
const courses = useCourseStore(state => state.courses);

// ✅ Also good - Multiple selections
const { courses, isLoading } = useCourseStore(
  state => ({ 
    courses: state.courses,
    isLoading: state.isLoading
  })
);
```

### 2. Don't Subscribe to Entire Store
```javascript
// ❌ Not ideal - Re-renders on any state change
const store = useCourseStore();

// Better to select specific values
const { courses, isLoading } = useCourseStore();
```

### 3. Memoize Callback Functions
```javascript
// ✅ Good - Stable function reference
const handleDelete = useCallback(async (id) => {
  await deleteCourse(id);
}, [deleteCourse]);
```

---

## Troubleshooting

### Store not updating after API call?
**Check:** Are you using `await` before the store action?
```javascript
// ✅ Correct
await createCourse(data);

// ❌ Wrong (doesn't wait for update)
createCourse(data);
```

### Error message not showing?
**Check:** Is `react-hot-toast` installed and imported?
```bash
npm install react-hot-toast
```
```javascript
import toast from 'react-hot-toast';
// This should be in your store file
```

### State persisting in localStorage but not loading on refresh?
**Check:** Your browser localStorage is not full or blocked
```javascript
// Clear and try again
localStorage.clear();
// Then refresh page
```

### API calls failing with 401?
**Check:** Token might be expired or not set
```javascript
// Token should be set in localStorage by authStore
// On login: localStorage.setItem('token', response.token);

// Check in DevTools > Application > localStorage > token
```

---

## Migration Checklist (When Using in New Components)

- [ ] Import the store hook
- [ ] Destructure needed state and actions
- [ ] Remove useState for API data
- [ ] Remove useEffect for manual API calls
- [ ] Use store action instead of direct API calls
- [ ] Use isLoading from store for loading state
- [ ] Let store handle error messages via toast
- [ ] Test the component in browser
- [ ] Check Network tab to verify API calls
- [ ] Check localStorage for persistence

---

## Quick Copy-Paste Templates

### Add Course Button
```javascript
const { createCourse, isLoading } = useCourseStore();
const navigate = useNavigate();

const handleCreate = async (formData) => {
  try {
    await createCourse(formData);
    navigate('/admin/courses');
  } catch (error) {
    // Error handled by store
  }
};

<form onSubmit={handleCreate}>
  {/* form fields */}
  <button disabled={isLoading}>
    {isLoading ? 'Creating...' : 'Create Course'}
  </button>
</form>
```

### Delete with Confirmation
```javascript
const { deleteCourse } = useCourseStore();

const handleDelete = async (courseId) => {
  if (window.confirm('Delete this course?')) {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      // Error handled by store
    }
  }
};

<button onClick={() => handleDelete(course._id)}>Delete</button>
```

### List with Loading
```javascript
const { courses, isLoading, fetchCourses } = useCourseStore();

useEffect(() => {
  fetchCourses();
}, []);

if (isLoading) return <div>Loading...</div>;

return courses.map(course => (
  <div key={course._id}>{course.title}</div>
));
```

---

## Next Learning Resources

1. **Zustand Official Docs:** https://github.com/pmndrs/zustand
2. **State Management Best Practices:** See ZUSTAND_MIGRATION_SUMMARY.md
3. **Code Examples:** See BEFORE_AFTER_COMPARISON.md
4. **Verification Steps:** See ZUSTAND_VERIFICATION_CHECKLIST.md

---

**Happy coding! 🚀**
