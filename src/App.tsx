import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import ListScreen from "./screens/ListScreen";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ListScreen />
        </Route>
        <Route path="/focus">
          <div>Focus View</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
