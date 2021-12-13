import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

function MainRouter(prop) {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact={true}></Route>
        <Route path="/products" component={Products} exact={true}></Route>
        <Route
          path="/products/details/:id"
          component={ProductDetails}
          exact={true}
        ></Route>
        <Route path="/" component={Home} exact={true}></Route>
      </Switch>
    </Router>
  );
}

export default MainRouter;
