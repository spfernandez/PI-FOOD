import './App.css';
import { LandingPage, HomePage, DetailPage, FormPage } from './views/index';
import {BrowserRouter, Route, Switch} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' render={() => <HomePage/>} />
          <Route path='/detail/:id' render={() => <DetailPage/>} />
          <Route path='/create' component={FormPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
