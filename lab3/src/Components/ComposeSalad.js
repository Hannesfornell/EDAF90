import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class ComposeSalad extends Component {
    constructor(props) {
      super(props)
      this.state = {selectedFoundation: '', selectedDressing: '', foundation:'', protein: [], extra: [],dressing:''}
      this.handleFoundationChange = this.handleFoundationChange.bind(this)
      this.handleProteinChange = this.handleProteinChange.bind(this)
      this.handleExtraChange = this.handleExtraChange.bind(this)
      this.handleDressingChange = this.handleDressingChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFoundationChange(event) {
      this.setState({selectedFoundation: event.target.value, foundation: event.target.value})
      event.target.parentElement.classList.add("was-validated");
    }

    handleProteinChange(event) {
      let newState
      if(this.state.protein.indexOf(event.target.name)>-1) {
        newState = this.state.protein.filter(protein => protein !== event.target.name)
      } else {
        newState = this.state.protein
        newState.push(event.target.name)
      }
      this.setState({protein: newState})
      event.target.parentElement.classList.add("was-validated");
    }

    handleExtraChange(event) {
      let newState
      if(this.state.extra.indexOf(event.target.name)>-1) {
        newState = this.state.extra.filter(extra => extra !== event.target.name)
      } else {
        newState = this.state.extra
        newState.push(event.target.name)
      }
      this.setState({extra: newState})
      event.target.parentElement.classList.add("was-validated");
    }

    handleDressingChange(event) {
      this.setState({selectedDressing: event.target.value, dressing: event.target.value})
      event.target.parentElement.classList.add("was-validated");
    }

    handleSubmit(event) {
      if(event.target.checkValidity()){
      this.props.newSalad(this.state.foundation, this.state.protein, this.state.extra, this.state.dressing)
      this.setState({selectedFoundation:  '-- select an option -- ', selectedDressing:  '-- select an option --', foundation: '', protein: [], extra: [], dressing: ''})
      this.props.history.push('/viewOrder')
      event.target.classList.add("was-validated");
      }
      event.preventDefault()
    }

    render() {
      const inventory = this.props.inventory
      let foundations = Object.keys(inventory).filter(name => inventory[name].foundation)
      let proteins = Object.keys(inventory).filter(name => inventory[name].protein)
      let extras = Object.keys(inventory).filter(name => inventory[name].extra)
      let dressings = Object.keys(inventory).filter(name => inventory[name].dressing)
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
              <label>Choose foundation</label>
              <select className="form-control"  required value={this.state.selectedFoundation} onChange={this.handleFoundationChange}>
                <option value='' disabled> -- select an option -- </option>
                {foundations.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <div className="invalid-feedback">required, select one</div>
            </div>

            <div className="form-group">
              <div className="form-check">
                <label>Choose protein</label>
                <div>
                  {proteins.map(name => {
                      return <div key={name}>
                                <input type="checkbox"  className="form-check-input" key={name} name={name} checked={this.state.protein.indexOf(name)>-1} onChange={this.handleProteinChange}></input>
                                <label className="form-check-label">{name}</label>
                              </div>
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <label>Choose extras</label>
                <div>
                  {extras.map(name => {
                      return <div key={name}>
                                <input type="checkbox" className="form-check-input" key={name} name={name} checked={this.state.extra.indexOf(name)>-1} onChange={this.handleExtraChange}></input>
                                <label className="form-check-label">{name}</label>
                              </div>
                      }
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Choose dressing</label>
              <select className="form-control"  required value={this.state.selectedDressing} onChange={this.handleDressingChange}>
                <option disabled value=''> -- select an option -- </option>
                {dressings.map(name => <option key={name} name={name}>{name}</option>)}
              </select>
              <div className="invalid-feedback">required, select one</div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" value="Submit" >Order and submit</button>
            </div>
          </form>
        </div>
      )
    }
  }
  
  export default withRouter(ComposeSalad);