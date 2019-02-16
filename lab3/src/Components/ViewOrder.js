import React, { Component } from 'react'

class ViewOrder extends Component {
    render(){
        return (
                <div>
                    <label>Order: {this.props.list.foundation + ',' + this.props.list.protein + ',' + this.props.list.extra + ',' + this.props.list.dressing}</label>
                </div>
                )
            }
}

export default ViewOrder