import React, { useState, useEffect , useMemo} from 'react';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { AuthContext } from './utils/AuthContext'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import 'rsuite/dist/styles/rsuite-default.css';

export default function App(){
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  
  useEffect(() => {
    // document.body.style.backgroundColor = "#f5f5f5";
  }, []);
  

  return(
    <Router>
      <div className="App">
        <AuthContext.Provider value = {providerValue}>
          <Switch>
            <Route path = "/dashboard" exact component={Dashboard}/>
            <Route path = "/" exact component={Landing}/>
          </Switch>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}
