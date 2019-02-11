import React, { Component } from 'react'
import ComposeSalad from './Components/ComposeSalad'
import ViewOrder from './Components/ViewOrder'
import inventory from './inventory.ES6'
import shortId from '../node_modules/shortid'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {salad:{}}
    this.createSalad = this.createSalad.bind(this)
    this.removeOrder =this.removeOrder.bind(this)
  }

  createSalad(found, prot, extr, dress){
    let salad = {id:shortId.generate(), foundation: found, protein: prot, extra: extr, dressing: dress}
    this.setState({salad: salad })
  }

  removeOrder(){
    this.setState({list: []})
  }
  render() {
    const composeSalad = (...params) => <ComposeSalad inventory={inventory} newSalad={this.createSalad}/>
    const viewOrder= (...params) => <ViewOrder list={this.state.salad} removeOrder={this.removeOrder}/>
    return (
        <Router>
          <div>
            <div>
              <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link" to='/composeSalad'>Komponera din egen sallad</Link>
                </li>
                    <Link className="nav-link" to='/viewOrder'>Se din order</Link>
              </ul>
              <div className="jumbotron text-center">
                <h1>My Own Salad Bar</h1>
                <p>Here you can order custom made salads!</p> 
              </div>
              <Route exact path="/app" component={App} />
              <Route path="/composeSalad" render={composeSalad} />
              <Route path="/viewOrder" render={viewOrder} />
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
