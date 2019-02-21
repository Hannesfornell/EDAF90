import React, { Component } from 'react'

class ViewOrder extends Component {
    order(order) {
        fetch('http://localhost:8080/orders/', {
            method: 'post',
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        
    }
    render(){
        return (
                <div>
                    <label>Order: {this.props.list.foundation + ',' + this.props.list.protein + ',' + this.props.list.extra + ',' + this.props.list.dressing }</label>
                    <button onClick={()=> this.order(this.props.list)}>Post order</button>
                </div>
                )
            }
}

export default ViewOrder