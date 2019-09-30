import React from 'react';
import {formatPrice} from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component{

    /* static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string,
        }),
        addToOrder: PropTypes.func,
    } */

    render() {
        const details = this.props.details;
        const index = this.props.index;
        const isAvailable = details && details.status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
        return(
             <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                 <h3 className="fish-name">
                     {details.name}
                     <span className="price">{formatPrice(details.price)}</span>
                 </h3>
                 <p>{details.desc}</p>
                 <button onClick = {() =>this.props.addToOrder(index)} disabled={!isAvailable}>Add To Order</button>
             </li>
        )
    }
}

Fish.propTypes = {
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
}

export default Fish;