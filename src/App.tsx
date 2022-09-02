import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import "antd/dist/antd.min.css";

import Dashboard from './containers/Dashboard/Dashboard';
import LoginPage from './containers/LoginPage/LoginPage';

function App() {
    return (
        <div className="App">
            <Router>
                <React.StrictMode>
                    <Switch>
                        <Route exact path={'/'} component={LoginPage} />
                        <Route path={'/dashboard'} component={Dashboard} />
                        <Route component={() => <div>No Page Found</div>} />
                    </Switch>
                </React.StrictMode>
            </Router>
        </div>
    );
}

export default App;
