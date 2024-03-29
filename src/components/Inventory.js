import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';
import { auth } from 'firebase';
require('firebase/auth')

class Inventory extends React.Component{

    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.state = {
            uid: null,
            owner: null
        }
    }

    /* componentDidMount(){
        base.onAuth((user) => {
            if(user){
                this.authHandler(null,{user});
            }
        });
    } */

    logout(){
        base.unauth();
        this.setState({uid: null});
    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        console.log(fish);
        //take copy of fish and update with new data
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish);
        console.log(updatedFish);
    }

    authenticate(provider){
        console.log("Logging in with ${provider}");
        // base.AuthWithOAuthPopup(provider, this.authHandler);
        // base.signInWithEmailAndPassword("sonal1992sharma@gmail.com", "");
        // base.auth().createUserWithEmailAndPassword("email", "password").catch(function(error) {
        //     console.log(error);
        // });
    }

    authHandler(err, authData){
        console.log(authData);
        if(err){
            console.log(err);
            return;
        }

        //grabbing the store info
        const storeRef = base.database().ref(this.props.storeId);

        //querying firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            //claim if their is no owner already
            if(!data.owner){
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        });
    }

    renderInventory(key){
        const fish = this.props.fishes[key];
        return(
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" 
                    onChange={(e) => this.handleChange(e,key)}
                />
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" 
                    onChange={(e) => this.handleChange(e,key)}
                />
                <select type="text" name="status" value={fish.status} placeholder="Fish Status"
                    onChange={(e) => this.handleChange(e,key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc"
                    onChange={(e) => this.handleChange(e,key)}></textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" 
                    onChange={(e) => this.handleChange(e,key)}
                />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    
    render(){

        const logout = <button onClick={this.logout}>Log Out!</button>
        //check if they are not logged in at all
        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }

        if(this.state.uid !== this.state.owner){
            return(
                <div> 
                    <p>
                        Sorry you aren't the owner of this store!
                    </p>
                    {logout}
                </div>
            )
        }

        
    }

    renderLogin(){
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish = { this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </nav>
        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
};

export default Inventory;