import { Route, Switch, Redirect } from 'react-router-dom';

import Index from "./views/Index/Index.js";
import Staff from "./views/Staff/Staff.js";
import Policies from "./views/Policies/Policies.js";
import Atc from "./views/atc/Atc.js";
import AtcList from "./views/atc/AtcList.js";
import AtcPolicies from "./views/atc/AtcPolicies.js";
import Layout from "./components/Layout/Layout";
import SubDivisions from "./views/SubDivisions/SubDivisions";

export default function App() {

  return (
    <Layout>
        <Switch>
          <Route exact path="/" children={ <Index/> } />
          <Route exact path="/staff" children={ <Staff/> } />
          <Route exact path="/policies" children={ <Policies/> } />
          <Route exact path="/subdivisions" children={ <SubDivisions/> } />
          <Route exact path="/atc" children={ <Atc/> } />
          <Route exact path="/atc/policies" children={ <AtcPolicies/> } />
          <Route exact path="/atc/:scope/:dependency" children={ <AtcList/> } />
          <Redirect from="*" to="/"/>
        </Switch>
    </Layout>
  );
}