import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
