import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

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
const HistoriqueGG = React.lazy(() => import ("./components/stock_products/stock giant gel/historique_giantgel"));
const SortEntrGG = React.lazy(() => import ("./components/stock_products/stock giant gel/stock_gg_table"));
const HistoriqueCl = React.lazy(() => import ("./components/stock_products/stock-colla-force/historiquecl"));
const SortEntrCl = React.lazy(() => import ("./components/stock_products/stock-colla-force/stock_cl_table"));
const HistoriqueGh = React.lazy(() => import ("./components/stock_products/golden-horn/historique_goldenhorn"));
const SortEntrGh = React.lazy(() => import ("./components/stock_products/golden-horn/golden-horn"));
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Parent} />
          <Route path="/facturation" exact component={Facturation} />
          <Route path="/facture/historique" exact component={HistoriqueFuct} />
          <Route path="/facture/rubbish" exact component={Rubbish} />
          <Route
            path="/filtrer/date/"
            exact
            component={Historique_facturationDate}
          />
          <Route exact path="/all/products/" exact component={AllProducts} />
          <Route exact path="/historique/slim-body" component={HistoriqueSb} />
          <Route exact path="/historique/slimbody/out-in" component={SortEntrSb} />
          <Route exact path="/historique/giant-gel" component={HistoriqueGG} />
          <Route exact path="/historique/giantgel/out-in/" component={SortEntrGG} />
          <Route exact path="/historique/colla-force" component={HistoriqueCl} />
          <Route exact path="/historique/colla-force/out-in/" component={SortEntrCl} />
          <Route exact path="/historique/golden-horn" component={HistoriqueGh} />
          <Route exact path="/historique/golden-horn/out-in/" component={SortEntrGh} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
