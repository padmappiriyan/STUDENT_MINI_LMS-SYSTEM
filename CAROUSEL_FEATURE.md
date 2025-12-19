# Auto-Sliding Course Carousel Feature

## ✨ Overview

The **FeaturesSection** component now includes a beautiful auto-sliding carousel that showcases available courses with smooth animations and interactive controls.

## 🎯 Features

### **1. Auto-Sliding Carousel**
- ✅ Automatically slides every **4 seconds**
- ✅ Shows **3 courses at once** (previous, current, next)
- ✅ Smooth transitions with scale and opacity effects
- ✅ Center course is highlighted and clickable

### **2. Interactive Controls**

#### **Navigation Arrows**
- Left/Right arrows to manually navigate
- Positioned on sides of carousel
- Semi-transparent with backdrop blur
- Hover effects for better UX

#### **Dot Indicators**
- Shows total number of courses
- Active dot is elongated and fully opaque
- Click any dot to jump to that course
- Smooth transitions between slides

#### **Auto-Play Toggle**
- Play/Pause button below carousel
- Stops auto-sliding when user interacts
- Can be manually toggled on/off
- Shows current state (⏸ Pause / ▶ Play)

### **3. Visual Effects**

#### **Center Course (Active)**
- Full scale (100%)
- Full opacity
- Clickable
- "View Details" button visible
- Hover shadow effect

#### **Side Courses (Inactive)**
- Reduced scale (75%)
- Reduced opacity (50%)
- Slight horizontal offset
- Not clickable (for preview only)

### **4. Course Card Design**
Each course card displays:
- **Gradient header** with book icon
- **Course title** (max 2 lines)
- **Description** (max 3 lines)
- **Lesson count** with icon
- **Category badge** (colored pill)
- **Instructor name**
- **"View Details" button** (center card only)

## 📐 Layout

```
┌─────────────────────────────────────────────────┐
│              Hero Content Area                   │
│         (Welcome message, CTA buttons)           │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│          Featured Courses Carousel               │
│                                                   │
│   ┌───┐      ┌─────────┐      ┌───┐            │
│   │ ← │  [Prev] [CURRENT] [Next]  │ → │        │
│   └───┘      └─────────┘      └───┘            │
│                                                   │
│           ● ● ● ● ● (Dots)                       │
│           ⏸ Pause Auto-Slide                     │
└─────────────────────────────────────────────────┘
```

## 🎨 Styling

### **Colors**
- Background: Gradient from blue-600 to purple-600
- Cards: White with shadow
- Active dot: White
- Inactive dots: White with 40% opacity
- Arrows: White with 20% opacity background

### **Animations**
- Slide transition: 500ms
- Scale transition: 500ms
- Opacity transition: 500ms
- Shadow transition: 300ms

### **Responsive Design**
- Card width: Fixed at 320px
- Card height: Minimum 400px
- Adapts to different screen sizes
- Touch-friendly on mobile

## 🔧 Technical Implementation

### **Component Structure**

```javascript
FeaturesSection
├── Hero Content (children prop)
└── CourseCarousel
    ├── Carousel Container
    │   └── 3 Course Cards (visible)
    ├── Navigation Arrows
    ├── Dot Indicators
    └── Auto-Play Toggle
```

### **Props**

#### **FeaturesSection**
```javascript
{
  children: ReactNode,        // Hero content
  courses: Array,             // Array of course objects
  onCourseClick: Function     // Handler for course click
}
```

#### **CourseCarousel**
```javascript
{
  courses: Array,             // Array of course objects
  onCourseClick: Function     // Handler for course click
}
```

### **State Management**

```javascript
const [currentIndex, setCurrentIndex] = useState(0);
const [isAutoPlaying, setIsAutoPlaying] = useState(true);
```

### **Auto-Slide Logic**

```javascript
useEffect(() => {
  if (!isAutoPlaying || courses.length === 0) return;

  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  }, 4000); // 4 seconds

  return () => clearInterval(interval);
}, [isAutoPlaying, courses.length]);
```

### **Visible Courses Calculation**

```javascript
const getVisibleCourses = () => {
  const visible = [];
  for (let i = -1; i <= 1; i++) {
    const index = (currentIndex + i + courses.length) % courses.length;
    visible.push({ course: courses[index], offset: i });
  }
  return visible;
};
```

## 🎮 User Interactions

### **1. Click Center Course**
```
User clicks center course card
→ Triggers onCourseClick(courseId)
→ Shows "Please sign in" toast
→ Redirects to /login with return URL
```

### **2. Click Navigation Arrow**
```
User clicks left/right arrow
→ Moves to previous/next course
→ Auto-play stops
→ Smooth transition animation
```

### **3. Click Dot Indicator**
```
User clicks any dot
→ Jumps to that course
→ Auto-play stops
→ Immediate transition
```

### **4. Toggle Auto-Play**
```
User clicks Play/Pause button
→ Toggles isAutoPlaying state
→ Button text updates
→ Auto-sliding starts/stops
```

## 📱 Responsive Behavior

### **Desktop (>1024px)**
- Shows 3 cards clearly
- Arrows positioned outside
- Full animations

### **Tablet (768px - 1024px)**
- Shows 3 cards with slight overlap
- Arrows positioned on edges
- Full animations

### **Mobile (<768px)**
- Shows 1 main card clearly
- Side cards partially visible
- Touch swipe support (future enhancement)
- Arrows remain functional

## 🚀 Performance Optimizations

1. **Efficient Re-renders**
   - Only re-renders when index changes
   - Cleanup interval on unmount

2. **Smooth Animations**
   - CSS transitions instead of JavaScript
   - GPU-accelerated transforms

3. **Lazy Loading** (Future)
   - Load course images on demand
   - Preload adjacent courses

## 🎯 Usage Example

```javascript
import FeaturesSection from '../components/FeaturesSection';

<FeaturesSection 
  courses={courses} 
  onCourseClick={handleCourseClick}
>
  <div className="text-center">
    <h1>Welcome to QuickLearn</h1>
    <p>Your hero content here</p>
    <button>Get Started</button>
  </div>
</FeaturesSection>
```

## 🔮 Future Enhancements

1. **Touch Gestures**
   - Swipe left/right on mobile
   - Pinch to zoom course cards

2. **Keyboard Navigation**
   - Arrow keys to navigate
   - Enter to select course
   - Escape to pause

3. **Accessibility**
   - ARIA labels for screen readers
   - Focus management
   - Keyboard-only navigation

4. **Advanced Features**
   - Variable slide speed
   - Pause on hover
   - Custom transition effects
   - Video previews

## ✅ Benefits

1. **User Engagement**
   - Eye-catching animations
   - Interactive exploration
   - Showcases course quality

2. **Better UX**
   - Easy navigation
   - Clear visual hierarchy
   - Intuitive controls

3. **Conversion**
   - Highlights featured courses
   - Encourages sign-ups
   - Professional appearance

4. **Scalability**
   - Works with any number of courses
   - Circular navigation
   - Responsive design

## 🎨 Customization

You can easily customize:

```javascript
// Slide interval (in milliseconds)
const interval = setInterval(() => {
  // Change 4000 to any value
}, 4000);

// Number of visible courses
// Change loop range in getVisibleCourses()
for (let i = -1; i <= 1; i++) { // Shows 3 courses
  // Change to -2 to 2 for 5 courses, etc.
}

// Card dimensions
style={{ width: '320px', minHeight: '400px' }}

// Transition duration
className="transition-all duration-500"
```

The carousel is now fully functional and ready to showcase your courses! 🎓✨
