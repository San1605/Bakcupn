const loopworker = () => {
    onmessage = (e) => {
        const num = e.data;
        let result = 0;
        for (let i = 1; i <= num; i++) {
            const data = { type: 'loading', i, num }
            postMessage(JSON.parse(JSON.stringify(data)))
            for (let j = 0; j < i; j++) {
                result++;
            }
        }
        const data = {
            type: 'result',
            result
        }
        postMessage(JSON.parse(JSON.stringify(data)))
    }
}

let code = loopworker.toString()
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))
const blob = new Blob([code], { type: 'application/javascriptssky' })
const workerScript = URL.createObjectURL(blob)
module.exports = workerScript;