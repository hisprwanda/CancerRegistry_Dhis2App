import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { Switch } from 'react-router-dom'
import classes from './App.module.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Reports from './pages/Reports'

function MyApp() {
    return(
<>
<Router>

<Navbar />

<Switch>

<Route path="/" exact component={Home}/>
<Route path="/products" component={Products}/>
<Route path="/reports" component={Reports}/>

</Switch>

</Router>
    
</>
    );
}
export default MyApp
