import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login_register from "./screen/login_register";
import TodosComponent from "./screen/todo";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={login_register} />
          <Route exact path="/todo" component={TodosComponent} />
      </Switch>
    </Router>
  );
}