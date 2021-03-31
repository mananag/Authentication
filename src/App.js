import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import {HashRouter , Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import requireAuth from "./components/requireAuth";


const link = createHttpLink({
    uri: 'https://qraphql-authentication.herokuapp.com/graphql',
    credentials: 'include'
});
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
})

const Dashboard = () => {
    return(
        <div>
            You are logged in!!
        </div>
    )
}

function App() {
  return (
      <ApolloProvider client = {client}>
          <HashRouter>

              <Route path={'/'}>
                  <Header />
              </Route>
              <Switch>
                  <Route exact path={'/dashboard'}>
                      {requireAuth(Dashboard)}
                  </Route>
                  <Route path={"/login"}>
                      <Login />
                  </Route>
                  <Route path={"/signup"}>
                      <SignUp />
                  </Route>
              </Switch>
          </HashRouter>
      </ApolloProvider>
  );
}

export default App;
