import React from 'react';
import PageTransition from '../components/PageTransition';
import News from '../components/News';

const NewsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-24">
        <News />
      </div>
    </PageTransition>
  );
};

export default NewsPage;