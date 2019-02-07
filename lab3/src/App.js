import React, { Component } from 'react'
import ComposeSalad from './Components/ComposeSalad'
import ViewOrder from './Components/ViewOrder'
import inventory from './inventory.ES6'
import shortId from '../node_modules/shortid'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { list: []}
    this.createSalad = this.createSalad.bind(this)
    this.removeOrder =this.removeOrder.bind(this)
  }

  createSalad(found, prot, extr, dress){
    let temp = this.state.list
    temp.push({id:shortId.generate(), foundation: found, protein: prot, extra: extr, dressing: dress})
    this.setState({list: temp})
  }

  removeOrder(){
    this.setState({list: []})
  }
  
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>My Own Salad Bar</h1>
          <p>Here you can order custom made salads!</p> 
         </div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <ComposeSalad inventory={inventory} newSalad={this.createSalad}/>
            </div>
            <div className="col-sm">
              <ViewOrder list={this.state.list} removeOrder={this.removeOrder}/>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
