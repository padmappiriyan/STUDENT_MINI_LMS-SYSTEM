# Course Image Upload Implementation

## ✅ Backend Implementation Complete

### **1. Multer Configuration** (`middleware/upload.js`)

**Features:**
- ✅ File storage in `uploads/courses/` directory
- ✅ Unique filename generation: `course-timestamp-random.ext`
- ✅ File type validation (jpeg, jpg, png, gif, webp)
- ✅ File size limit: 5MB
- ✅ Automatic directory creation
- ✅ Helper function to delete old images

**Storage Structure:**
```
backend/
└── uploads/
    └── courses/
        ├── course-1701234567890-123456789.jpg
        ├── course-1701234567891-987654321.png
        └── ...
```

### **2. Course Controller Updates**

#### **createCourse**
```javascript
- Accepts image file via multer
- Saves image path to database
- Deletes image if course creation fails
```

#### **updateCourse**
```javascript
- Accepts new image file (optional)
- Deletes old image if new one uploaded
- Updates image path in database
- Deletes new image if update fails
```

#### **deleteCourse**
```javascript
- Deletes associated image file
- Then deletes course from database
```

### **3. Route Updates** (`routes/courseRoutes.js`)

```javascript
// Create course with image
POST /api/courses
- Middleware: adminMiddleware, uploadCourseImage
- Body: multipart/form-data
- Fields: title, description, category, duration, image

// Update course with image
PUT /api/courses/:id
- Middleware: adminMiddleware, uploadCourseImage
- Body: multipart/form-data
- Fields: title, description, category, duration, image (optional)
```

### **4. Static File Serving** (`server.js`)

```javascript
app.use('/uploads', express.static('uploads'));
```

**Access uploaded images:**
```
http://localhost:5000/uploads/courses/course-1701234567890-123456789.jpg
```

## 📝 Course Model Update

```javascript
{
  title: String,
  description: String,
  category: String,
  instructor: ObjectId,
  image: String,  // NEW: Path to uploaded image
  duration: Number,
  lessons: [ObjectId],
  // ...
}
```

## 🔧 Frontend Integration

### **1. Create Course Form**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('duration', duration);
  
  // Add image file
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  try {
    await courseAPI.createCourse(formData);
    toast.success('Course created!');
  } catch (error) {
    toast.error('Failed to create course');
  }
};
```

### **2. Update API Service** (`services/api.js`)

```javascript
export const courseAPI = {
  createCourse: (formData) => 
    axiosInstance.post('/courses', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
  updateCourse: (id, formData) => 
    axiosInstance.put(`/courses/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};
```

### **3. Image Input Component**

```jsx
<div>
  <label>Course Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
  />
  
  {/* Preview */}
  {imageFile && (
    <img 
      src={URL.createObjectURL(imageFile)} 
      alt="Preview" 
      className="w-32 h-32 object-cover"
    />
  )}
</div>
```

### **4. Display Course Image**

```jsx
{course.image ? (
  <img 
    src={`${import.meta.env.VITE_API_URL}${course.image}`}
    alt={course.title}
    className="w-full h-48 object-cover"
  />
) : (
  <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
    <FaBook className="text-6xl text-white opacity-50" />
  </div>
)}
```

## 🎯 Usage Examples

### **Create Course with Image**

```bash
POST http://localhost:5000/api/courses
Content-Type: multipart/form-data
Authorization: Bearer <admin-token>

{
  "title": "React Masterclass",
  "description": "Learn React from scratch",
  "category": "Web Development",
  "duration": 120,
  "image": <file>
}
```

### **Update Course Image**

```bash
PUT http://localhost:5000/api/courses/:id
Content-Type: multipart/form-data
Authorization: Bearer <admin-token>

{
  "title": "React Masterclass Updated",
  "image": <new-file>  // Optional
}
```

### **Response Example**

```json
{
  "success": true,
  "course": {
    "_id": "...",
    "title": "React Masterclass",
    "description": "Learn React from scratch",
    "category": "Web Development",
    "instructor": "...",
    "image": "/uploads/courses/course-1701234567890-123456789.jpg",
    "duration": 120,
    "lessons": [],
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## 🛡️ Security Features

1. **File Type Validation**
   - Only allows: jpeg, jpg, png, gif, webp
   - Checks both extension and MIME type

2. **File Size Limit**
   - Maximum: 5MB per file
   - Prevents server overload

3. **Unique Filenames**
   - Prevents filename conflicts
   - Uses timestamp + random number

4. **Authorization**
   - Only admins can upload/update/delete
   - Instructor ownership verification

5. **Error Handling**
   - Deletes uploaded file if operation fails
   - Prevents orphaned files

## 📁 File Structure

```
backend/
├── middleware/
│   └── upload.js           ✅ NEW - Multer configuration
├── uploads/
│   └── courses/            ✅ NEW - Image storage
│       └── course-*.jpg
├── controllers/
│   └── courseController.js ✅ UPDATED - Image handling
├── routes/
│   └── courseRoutes.js     ✅ UPDATED - Multer middleware
├── models/
│   └── Course.js           ✅ UPDATED - Image field
└── server.js               ✅ UPDATED - Static serving
```

## 🎨 Frontend Components Needed

1. **CreateCourse Form**
   - File input for image
   - Image preview
   - FormData submission

2. **EditCourse Form**
   - Current image display
   - File input for new image
   - Image preview
   - FormData submission

3. **Course Card**
   - Display course image
   - Fallback gradient if no image

4. **Course Details**
   - Large course image
   - Fallback gradient if no image

## ✅ Testing Checklist

- [ ] Upload image when creating course
- [ ] Create course without image (optional)
- [ ] Update course with new image
- [ ] Update course without changing image
- [ ] Delete course (image should be deleted)
- [ ] Try uploading non-image file (should fail)
- [ ] Try uploading file > 5MB (should fail)
- [ ] View uploaded image via URL
- [ ] Check image displays in frontend

## 🚀 Next Steps

1. Update frontend CreateCourse component
2. Update frontend EditCourse component
3. Update course display components
4. Add image optimization (optional)
5. Add image cropping/resizing (optional)
6. Add CDN integration (optional)

The backend is now fully configured for course image uploads! 📸✨
