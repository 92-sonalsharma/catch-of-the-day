import React from 'react';
import { formatPrice } from  '../helpers';
import PropTypes from 'prop-types';

class Order extends React.Component{

    constructor(){
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key){
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if(!fish || fish.status === 'unavailable'){
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!
            {removeButton}</li>
        }

        return(
            <li key={key}>
                <span>{count}lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            //check if there is a fish & fish status
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable){
                return prevTotal + (count * fish.price || 0);
            }
            return prevTotal;
        }, 0);//starting value is set to 0 for reduce() method)
        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    fishes: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
}

export default Order;