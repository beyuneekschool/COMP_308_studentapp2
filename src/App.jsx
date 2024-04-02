import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Use React.lazy for dynamic import of the StudentForm component
const StudentForm = lazy(() => import('studentapp1/StudentForm'));

const App = () => (
  <div className="container">
    <div>Name: studentapp2</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    {/* Use Suspense to wait for the dynamic import */}
    <Suspense fallback={<div>Loading Form...</div>}>
      <StudentForm />
    </Suspense>
  </div>
);

// Select the element where you want to mount your app
const container = document.getElementById('app');
const root = createRoot(container); // Create a root

// Use the root to render your app
root.render(<App />);
