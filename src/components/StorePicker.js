import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component{

    goToStore(event){
        event.preventDefault();
        console.log("URL changed.");
        // const value = $('input').val();
        console.log(this.storeInput.value);
    }

    render(){
        // return <p>Hello</p>
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please enter a store</h2>
                {/* getFunName being the helper function  
                Using an arrow function, meaning when this whole input tag is rendered on the page, it's going to put a reference of this input tag on the class itself*/}
                <input type="text" required placeholder="Store Name" 
                    defaultValue={getFunName()} 
                    ref={(input) =>{this.storeInput = input}}/>
                <button type="submit">Visit Store -></button>
            </form> 
        )
    }
}

export default StorePicker;