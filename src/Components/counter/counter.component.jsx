import React from "react";
import './counter.styles.scss'

class Counter extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            count:0
        };
    }

    setCount = (number1) => {
        this.setState((prevState)=>{
        return {count:prevState.count+number1}
        });
    }

    render() {
        return (
        <div className="counter-text">
            <h1 className="">{this.state.count}</h1>
            <div className = "button-wrapper">
                <button onClick={()=>this.setCount(-1)}>-</button>
                <button onClick={()=>this.setCount(1)}>+</button>
            </div>
        </div>);
    }
}
export default Counter;