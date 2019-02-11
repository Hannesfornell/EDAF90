import React, { Component } from 'react'

class ViewOrder extends Component {
    constructor(props){
        super(props)
        this.state={displayOrder: false, currentOrder: []}
        this.newOrder= this.newOrder.bind(this)
        this.postOrder = this.postOrder.bind(this)
    }

    newOrder(){
        this.setState({displayOrder: true, currentOrder: this.props.list})
        this.props.removeOrder()
    }

    postOrder(){
        return 
    }
    
    render(){
        return (
                <div>
                    <label>Order: {this.props.list.foundation + ',' + this.props.list.protein + ',' + this.props.list.extra + ',' + this.props.list.dressing}</label>
                </div>
                )
            }
}

export default ViewOrder