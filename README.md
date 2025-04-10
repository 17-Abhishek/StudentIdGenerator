# Smart Student ID Generator

A ReactJS application that generates and manages student ID cards with multiple templates, photo upload, and export capabilities.

## 🚀 Features

- **Student Data Input Form**
  - Personal details (name, roll number, class, division)
  - Health information (allergies)
  - Logistics details (rack number, bus route)
  - Photo upload with preview

- **Smart ID Card Generation**
  - Two professionally designed templates
  - Interactive template switching
  - QR code generation with student information
  - "Download as PNG" functionality

- **Data Persistence**
  - Save generated cards to localStorage
  - View history of previously generated cards
  - Restore and download saved cards

## 💡 Technical Implementation

### Architecture
The application follows a clean, component-based architecture with a focus on:
- Separation of concerns
- Reusable components
- Type safety with TypeScript
- Form validation with React Hook Form and Zod
- Responsive design with Tailwind CSS

### Key Components

1. **StudentForm**
   - Handles data collection and validation
   - Manages photo upload with preview
   - Provides template selection 

2. **CardTemplate**
   - Renders different card designs based on selected template
   - Displays student information with appropriate styling
   - Generates QR code with essential student data

3. **CardPreview**
   - Provides a visual preview of the generated card
   - Handles PNG download functionality using html-to-image

4. **HistoryPanel**
   - Displays previously generated cards
   - Allows restoring and downloading past cards

### Data Flow

1. User fills out the form and uploads a photo
2. On form submission, data is validated and a student card object is created
3. The card is displayed in the preview section and saved to localStorage
4. User can switch templates, download the card as PNG, or view history

## 💭 Design Decisions & Thought Process

### Responsive UI
- Used a grid layout to ensure proper display on different devices
- Implemented collapsible sections for mobile view
- Created an intuitive form flow with proper validation feedback

### Card Templates
- Template 1: Classic, professional design with a clean layout
- Template 2: Modern, colorful design with visual hierarchy
- Both templates highlight important information while maintaining readability

### Data Handling
- Implemented complete form validation to ensure data integrity
- Limited QR code data to essential information for better performance
- Used localStorage for persistence without requiring backend infrastructure

### User Experience Considerations
- Added loading indicators for asynchronous operations
- Implemented error handling for photo uploads and card generation
- Provided visual feedback for user actions throughout the application
- Made sure history panel enables easy access to previously generated cards

## 🔧 Technologies Used

- React 18
- TypeScript
- Tailwind CSS with shadcn/ui components
- React Hook Form with Zod validation
- html-to-image for PNG export
- qrcode.react for QR code generation
- localStorage for data persistence

## 📝 Lessons Learned

- Optimizing QR code data size for better performance
- Managing complex form states with React Hook Form
- Working with image processing in a React context
- Implementing reusable template systems for varied designs
- Balancing aesthetic appeal with functional clarity

## 🚀 Future Enhancements

- Backend integration for secure card storage
- Authentication for administrative access
- Batch processing for multiple student cards
- Additional card templates with customization options
- QR code scanning functionality for verification