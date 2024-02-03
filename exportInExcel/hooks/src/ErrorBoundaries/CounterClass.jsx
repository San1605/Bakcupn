import React from "react";
class CounterClass extends  React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(({ count }) => ({
            count: count + 1
        }))
    }

    render() {
        if (this.state.count === 3) {

            throw new Error('Crashed!!!!');
        }
        return (
            <>
              <p>{this.state.count}</p>
              <button onClick={this.handleClick}>increase</button>
            </>
        )
    }
}
export default CounterClass 