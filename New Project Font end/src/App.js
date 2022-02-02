import './App.css';
import {AppMenuTable} from './Component/AppMenuTable'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/' component={AppMenuTable} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
