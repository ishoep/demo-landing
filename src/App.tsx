import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // ✅ Добавил Navigate
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import HistoryPage from './pages/HistoryPage';
import CoursesPage from './pages/CoursesPage';
import ContactsPage from './pages/ContactsPage';
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Awards from './pages/Awards';

// ✅ Компонент для защиты маршрутов
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("token"); 
  return token ? element : <Navigate to="/login" replace />;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminPanel />} />} /> {/* ✅ Защитили маршрут */}
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/awards" element={<Awards />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500">
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
