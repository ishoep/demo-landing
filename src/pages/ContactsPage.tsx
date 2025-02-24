import React from 'react';
import PageTransition from '../components/PageTransition';
import ContactForm from '../components/ContactForm';

const ContactsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-24">
        <ContactForm />
      </div>
    </PageTransition>
  );
};

export default ContactsPage;