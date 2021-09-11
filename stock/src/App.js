import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoutes";
import axios from "axios";
//import RoleBased from "./components/auth/controleAccess";
const Parent = React.lazy(() => import("./components/Parent"));
const HistoriqueFuct = React.lazy(() =>
  import("./components/historique_facture")
);
const Historique_facturationDate = React.lazy(() =>
  import("./components/historique_facturationDate")
);
const Rubbish = React.lazy(() => import("./components/rubbish"));
const Facturation = React.lazy(() => import("./components/facturation"));
const AllProducts = React.lazy(() =>
  import("./components/stock_products/all_products")
);
const HistoriqueSb = React.lazy(() =>
  import("./components/stock_products/stock slim body/historiquesb")
);
const SortEntrSb = React.lazy(() =>
  import("./components/stock_products/stock slim body/stock_sb_table")
);
const HistoriqueGG = React.lazy(() =>
  import("./components/stock_products/stock giant gel/historique_giantgel")
);
const SortEntrGG = React.lazy(() =>
  import("./components/stock_products/stock giant gel/stock_gg_table")
);
const HistoriqueCl = React.lazy(() =>
  import("./components/stock_products/stock-colla-force/historiquecl")
);
const SortEntrCl = React.lazy(() =>
  import("./components/stock_products/stock-colla-force/stock_cl_table")
);
const HistoriqueGh = React.lazy(() =>
  import("./components/stock_products/golden-horn/historique_goldenhorn")
);
const SortEntrGh = React.lazy(() =>
  import("./components/stock_products/golden-horn/golden-horn")
);
const HistoriquDateProducts = React.lazy(() =>
  import("./components/stock_products/product_historiqueDate")
);
const SignUp = React.lazy(() => import("./components/auth/SignUp"));
const SignIn = React.lazy(() => import("./components/auth/SignIn"));
const DashboardUsers = React.lazy(() => import("./components/dashboardUsers"));
const Pending = React.lazy(() => import("./components/data/pending"));
const PendingDb = React.lazy(() => import("./components/data/pending_db"));
const ConfirmedLeadsdb = React.lazy(() =>
  import("./components/data/confirmed_db")
);
const Canceled = React.lazy(() => import("./components/data/cancel"));
const NoAnswer = React.lazy(() => import("./components/data/noAnswered"));
const PostPonned = React.lazy(() => import("./components/data/postPonned"));
const Issue = React.lazy(() => import("./components/data/custom/issue"));
const Analytics = React.lazy(() => import("./components/data/custom/analytics"));
const TrafficKPI = React.lazy(() => import("./components/data/traffic_KPI"));
export const RouteBased = async () => {
  if (localStorage.getItem("Token")) {
    const datafromStorage = JSON.parse(localStorage.getItem("Token"));
    const userId = datafromStorage.Token.userIden;
    const rolebyIdapi = await axios.get(
      "http://localhost:8000/apis/api/get/user_id/" + userId
    );
    const exactRole = rolebyIdapi.data.role;
    if (exactRole !== "admin") {
      localStorage.removeItem("Token");
      return (window.location = "/");
    }
  }
};
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/admin/:id" exact component={Parent} />
          <PrivateRoute path="/facturation" exact component={Facturation} />
          <PrivateRoute
            path="/facture/historique"
            exact
            component={HistoriqueFuct}
          />
          <PrivateRoute path="/facture/rubbish" exact component={Rubbish} />
          <PrivateRoute
            path="/filtrer/date/"
            exact
            component={Historique_facturationDate}
          />
          <PrivateRoute exact path="/all/products/" component={AllProducts} />
          <PrivateRoute
            exact
            path="/historique/slim-body"
            component={HistoriqueSb}
          />
          <PrivateRoute
            exact
            path="/historique/slimbody/out-in"
            component={SortEntrSb}
          />
          <PrivateRoute
            exact
            path="/historique/giant-gel"
            component={HistoriqueGG}
          />
          <PrivateRoute
            exact
            path="/historique/giantgel/out-in/"
            component={SortEntrGG}
          />
          <PrivateRoute
            exact
            path="/historique/colla-force"
            component={HistoriqueCl}
          />
          <PrivateRoute
            exact
            path="/historique/colla-force/out-in/"
            component={SortEntrCl}
          />
          <PrivateRoute
            exact
            path="/historique/golden-horn"
            component={HistoriqueGh}
          />
          <PrivateRoute
            exact
            path="/historique/golden-horn/out-in/"
            component={SortEntrGh}
          />
          <PrivateRoute
            exact
            path="/filtrer/date/products"
            component={HistoriquDateProducts}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/:userId"
            component={DashboardUsers}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/pending/:userId"
            component={Pending}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/pending/db/:userId"
            component={PendingDb}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/confirmed/db/:userId"
            component={ConfirmedLeadsdb}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/cancels/db/:userId"
            component={Canceled}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/no-answer/db/:userId"
            component={NoAnswer}
          />
          <PrivateRoute
            exact
            path="/dashboard/user_uu/post-ponned/db/:userId"
            component={PostPonned}
          />
          <PrivateRoute path="/issues/user/:userId" exact component={Issue} />
          <PrivateRoute
            path="/dashboard/user_uu/analytics/:userId"
            exact
            component={Analytics}
          />
          <PrivateRoute
          exact
          path="/dashboard/user_uu/traffic/kpi/db/:userId"
          component={TrafficKPI}
          />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
