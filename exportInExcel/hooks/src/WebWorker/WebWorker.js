import React, { Component } from 'react'

class WebWorker extends Component {
    constructor() {
        super();
        this.state = {
            num: "",
            result: "",
            loadingMessage: ''
        }
        this.handleCount = this.handleCount.bind(this)
        this.handleCalculate = this.handleCalculate.bind(this)
    }

    handleCount(e) {
        this.setState({
            num: e.target.value
        })
    }

    handleCalculate() {
        const { num } = this.state;
        let result = 0;
        for (let i = 1; i <= num; i++) {
            this.setState({
                loadingMessage: `Loaded ${i} / ${num}`
            })
            for (let j = 0; j < i; j++) {
                result++;
            }
            this.setState({
                result
            })
        }
    }

    render() {
        return (
            <>
                <input onChange={this.handleCount} />
                <button onClick={this.handleCalculate}>Calculate</button>
                <div>{this.state.loadingMessage}</div>
                <div>{this.state.result}</div>
            </>
        )
    }
}
export default WebWorker