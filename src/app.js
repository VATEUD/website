import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Index from "./views/Index/Index.js";
import Staff from "./views/Staff/Staff.js"
import Policies from "./views/Policies/Policies.js"
import Atc from "./views/atc/Atc.js"
import AtcList from "./views/atc/AtcList.js"
import AtcPolicies from "./views/atc/AtcPolicies.js"
import Layout from "./components/Layout/Layout"
import Subdivisions from "./views/subdivisions/Subdivisions"

export default function App() {

  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" children={ <Index/> } />
          <Route exact path="/staff" children={ <Staff/> } />
          <Route exact path="/policies" children={ <Policies/> } />
          <Route exact path="/atc" children={ <Atc/> } />
          <Route exact path="/atc/policies" children={ <AtcPolicies/> } />
          <Route exact path="/atc/:scope/:dependency" children={ <AtcList/> } />
          <Route exact path="/subdivisions" children={ <Subdivisions/> } />
          <Redirect from="*" to="/"/>
        </Switch>
      </Router> 
    </Layout>
  );
}