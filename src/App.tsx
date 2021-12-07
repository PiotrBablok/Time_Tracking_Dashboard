import React, { useState } from 'react';
import PersonCard from './components/person_card/PersonCard';
import PersonActivities from './components/person_activities/PersonActivities'

import { scopeState } from './utilities/ScopeState' // TS type

import './App.css';

function App() {

  const [scope, setScope] = useState<scopeState>('daily')

  const scopeHandler = (newScope: scopeState) => {
    setScope(newScope)
  }


  return (
    <div className="App">
      <PersonCard scopeFn={scopeHandler} />
      <PersonActivities newScope={scope} />
    </div>
  );
}

export default App;
