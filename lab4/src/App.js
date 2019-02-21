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
  }
  componentWillMount() {
    fetch('http://localhost:8080/foundations/')
    .then(response => response.json())
    .then(data => {
      let requests = data.map(name => fetch(`http://localhost:8080/foundations/${name}`))
      return Promise.all(requests).then(responses => {
        Promise.all(responses.map(r => r.json())).then(details => {
          let result= {}
          data.forEach((d, i) => result[d]=details[i])
          this.setState({inventory: {...this.state.inventory, ...result}})
        })
      })
      }) 
      fetch('http://localhost:8080/proteins/')
      .then(response => response.json())
      .then(data => {
        let requests = data.map(name => fetch(`http://localhost:8080/proteins/${name}`))
        return Promise.all(requests).then(responses => {
          Promise.all(responses.map(r => r.json())).then(details => {
            let result= {}
            data.forEach((d, i) => {result[d]=details[i]})
            this.setState({inventory: {...this.state.inventory, ...result}})
          })
        })
        })
      fetch('http://localhost:8080/extras/')
      .then(response => response.json())
      .then(data => {
        let requests = data.map(name => fetch(`http://localhost:8080/extras/${name}`))
        return Promise.all(requests).then(responses => {
          Promise.all(responses.map(r => r.json())).then(details => {
            let result= {}
            data.forEach((d, i) => result[d]=details[i])
            this.setState({inventory: {...this.state.inventory, ...result}})
          })
        })
        })
      fetch('http://localhost:8080/dressings/')
      .then(response => response.json())
      .then(data => {
        let requests = data.map(name => fetch(`http://localhost:8080/dressings/${name}`))
        return Promise.all(requests).then(responses => {
          Promise.all(responses.map(r => r.json())).then(details => {
            let result= {}
            data.forEach((d, i) => result[d]=details[i])
            this.setState({inventory: {...this.state.inventory, ...result}})
          })
        })
        })
  }
  componentDidMount(){
    let oldSalad = JSON.parse(window.localStorage.getItem('Salad'))
    if(oldSalad) {
      // oldSalad.price = () => en pris funktion
      this.setState({ salad: oldSalad})
    }
  }
  createSalad(found, prot, extr, dress){
    let salad = {id:shortId.generate(), foundation: found, protein: prot, extra: extr, dressing: dress}
  
    this.setState({salad: salad })
    window.localStorage.setItem('Salad',JSON.stringify(salad))
  }


  render() {
    const composeSalad = (...params) => <ComposeSalad inventory={this.state.inventory} newSalad={this.createSalad}/>
    const viewOrder= (...params) => <ViewOrder list={this.state.salad} />
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
