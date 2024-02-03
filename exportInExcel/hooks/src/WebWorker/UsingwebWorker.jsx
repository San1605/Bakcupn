import { Component } from "react";
import workerScript from "./Worker";

class WebworkerUse extends Component {
    constructor() {
        super()
        this.state = {
            num: '',
            result: '',
            loadingMessage: ''
        }
        this.handleCount = this.handleCount.bind(this)
        this.handleCalculate = this.handleCalculate.bind(this)
    }

    componentDidMount() {
        this.worker = new Worker(workerScript)
        this.worker.addEventListener('message', e => {
            const type = e.data.type;
            if (type === 'loading') {
                const { i, num } = e.data;
                this.setState({
                    loadingMessage: `Loaded ${i} / ${num}`
                })
            }
            else {
                const { result } = e.data;
                this.setState({
                    result
                })
            }
        })
    }
    handleCount(e) {
        this.setState({
            num: e.target.value
        })
    }
    handleCalculate() {
        const { num } = this.state
        this.worker.postMessage(num)
    }

    render() {
        return (
            <>
                <input className="border border-black" onChange={this.handleCount} />
                <button onClick={this.handleCalculate}>Calculate</button>
                <div>{this.state.loadingMessage}</div>
                <div>{this.state.result}</div>
            </>
        )
    }
}

export default WebworkerUse



