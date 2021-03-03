import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import NavBar from './component/utils/navbar'
import NotFound from './component/hooks/notFound';
import MainBook from './component/hooks/books/main';


export default function App(){ 

  return(
    <React.Fragment>
      <NavBar/>
        <div className="container" style={{ paddingTop: "70px"}}>
        <Switch>
          <Route path="/" exact><MainBook/></Route>
          <Route path="/not-found"><NotFound/></Route>
          <Redirect to="/not-found"/>
        </Switch>
      </div>
  
    </React.Fragment>
  )
}