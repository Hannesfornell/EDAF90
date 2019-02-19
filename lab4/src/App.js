import React, { Component } from 'react'
import ComposeSalad from './Components/ComposeSalad'
import ViewOrder from './Components/ViewOrder'
import shortId from '../node_modules/shortid'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {salad:{}, inventory:{}}
    
    this.createSalad = this.createSalad.bind(this)
    this.removeOrder = this.removeOrder.bind(this)
  }
  // Ersätt data.foEach med att istället fetcha själva objekten från servern. Använd async och promise all
  componentWillMount() {
    fetch('http://localhost:8080/foundations/')
      .then(response => {
        return response.json()})
      .then(data => {
        let tempfoundation = {}
        data.forEach((item => tempfoundation[item]={foundation: true}))
        this.setState({inventory: {...this.state.inventory, ...tempfoundation} })
      return});
      fetch('http://localhost:8080/proteins/')
      .then(response => response.json())
      .then(data => {
        let tempprotein = {}
        data.forEach((item => tempprotein[item]={protein: true}))
        this.setState({inventory: {...this.state.inventory, ...tempprotein} })
      return});
      fetch('http://localhost:8080/extras/')
      .then(response => response.json())
      .then(data => {
        let tempextra = {}
        data.forEach((item => tempextra[item]={extra: true}))
        this.setState({inventory: {...this.state.inventory, ...tempextra} })
      return});
      fetch('http://localhost:8080/dressings/')
      .then(response => response.json())
      .then(data => {
        let tempdressing = {}
        data.forEach((item => tempdressing[item]={dressing: true}))
        this.setState({inventory: {...this.state.inventory, ...tempdressing} })
      return});
  }
  createSalad(found, prot, extr, dress){
    let salad = {id:shortId.generate(), foundation: found, protein: prot, extra: extr, dressing: dress}
    this.setState({salad: salad })
  }

  removeOrder(){
    this.setState({list: []})
  }
  render() {
    const composeSalad = (...params) => <ComposeSalad inventory={this.state.inventory} newSalad={this.createSalad}/>
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
