import React from "react";
import { Switch, BrowserRouter,Route } from "react-router-dom";
import PrivateRoute from './components/auth/PrivateRoutes'
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
const SignIn = React.lazy(() => import ("./components/auth/SignIn"))
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Parent} />
          <PrivateRoute path="/facturation" exact component={Facturation} />
          <PrivateRoute path="/facture/historique" exact component={HistoriqueFuct} />
          <PrivateRoute path="/facture/rubbish" exact component={Rubbish} />
          <PrivateRoute
            path="/filtrer/date/"
            exact
            component={Historique_facturationDate}
          />
          <PrivateRoute exact path="/all/products/"  component={AllProducts} />
          <PrivateRoute exact path="/historique/slim-body" component={HistoriqueSb} />
          <PrivateRoute
            exact
            path="/historique/slimbody/out-in"
            component={SortEntrSb}
          />
          <PrivateRoute exact path="/historique/giant-gel" component={HistoriqueGG} />
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
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
