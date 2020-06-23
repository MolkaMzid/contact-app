import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={AddContact}/>
        <Route exact path="/Edit/:id" component={EditContact}/>
      </Router>
    </div>
  );
}

export default App;
