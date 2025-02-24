import React from 'react';
import PageTransition from '../components/PageTransition';
import Courses from '../components/Courses';

const CoursesPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-24">
        <Courses />
      </div>
    </PageTransition>
  );
};

export default CoursesPage;