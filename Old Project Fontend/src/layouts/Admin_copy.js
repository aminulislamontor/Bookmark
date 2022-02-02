import React from 'react'
import { useLocation, Route, Switch, Redirect,useHistory } from "react-router-dom";
// @material-ui/core components
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

// @material-ui/icons components
import routes from "routes.js";
//tree comp
import Tree from 'react-animated-tree'


const Admin = () => {

  const treeStyles = {
    position: 'absolute',
    top: 10,
    left: 100,
    color: 'black',
    fill: 'black',
    width: '90%'
    
  }
  
  const typeStyles = {
    fontSize: '2em',
    verticalAlign: 'middle'
  }

  const history = useHistory();

  function rediapp(){
    history.push("./appMenu")
  }
  function redisub(){
    history.push("./subMenu")
  }
  function redilink(){
    history.push("./links")
  }

  const Treemenu = () => (
    <Tree content="DashBoard" open style={treeStyles}>
      <Tree content="App Menu" >
       <button type="button" onClick={rediapp}>Go to AppMenu</button>
        <Tree content="Sub Menu">
         <button type="button" onClick={redisub}>Go to Sub Menu</button>
          <Tree content="Links">
           <button type="button" onClick={redilink}>Go to Links</button>
        </Tree>
        </Tree>
      </Tree>
    </Tree>
  )



  const location = useLocation();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <>
      
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Treemenu/>
          <Container
            maxWidth={false}
            component={Box}
          >
          </Container>
          
        
      </>
    </>
  );
}
export default Admin;

