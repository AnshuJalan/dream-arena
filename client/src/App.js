import { render } from 'react-dom';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React,{Fragment,useState} from 'react';
import Navbar from './components/layout/Navbar'
import Upcoming from './components/matches/Upcoming'
import './App.css';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path='/upcoming' component={Upcoming}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
      
  );
}

export default App;
