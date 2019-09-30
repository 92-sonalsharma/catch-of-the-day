import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {

  constructor(){
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    //get initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  /* componentWillMount(){
    //syncstate takes a piece of string that points to the firebase database
    // we can specify whatever we want to sync specifically instead of the whole database
    this.ref = base
    .syncState(`fancy-clumsy-nuclei/fishes`,
    {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  } */

  componentWillUpdate(nextProps, nextState) {
    console.log('Something changed');
    console.log({nextProps, nextState});
    localStorage
    .setItem('order-${this.props.params.storeId}',
    JSON.stringify(nextState.order));
    // Set the order into localstorage when updated
    /* localStorage.setItem(
        this.props.match.params.storeId,
        JSON.stringify(this.state.order)
    ); */
};

  addFish(fish){
    //update state, but first take a copy of your current state and then only update the actual state
    // mostly done for performance basis
    const fishes = {...this.state.fishes};
    //... is a spread in ES6 used in array or functions. It will take every item from our object and spread it into this object
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({ fishes });
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    console.log("fishes before :: " + fishes);
    delete fishes[key];
    // fishes.splice(key, 1);
    // fishes[key] = null;
    this.setState({fishes});
    console.log("fishes now :: " + fishes);
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    });
  }

    addToOrder (key)
  {
    //take a copy of our previous state
    const order = {...this.state.order}; 
    //update or add new member of fish ordered
    order[key] = order[key] + 1 || 1;
    //then update our state})
    this.setState({order});
  }

  removeFromOrder(key){
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              //Key's value needs to be passed to be used in code
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]}
              addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} 
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.storeId}
          />
      </div>
    )
  }
}

App.propTypes = {
  params: PropTypes.object.isRequired
}

export default App;
