import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarApp } from './CalendarApp';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './styles/styles.css'





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="690947513678-1c4bdt13fpsa0cln99n8o0sf1nuj768s.apps.googleusercontent.com">
    <CalendarApp />
  </GoogleOAuthProvider>
);
