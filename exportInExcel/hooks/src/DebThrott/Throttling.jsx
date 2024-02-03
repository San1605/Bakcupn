import React from 'react'

const Throttling = () => {
    const handlerTrigger = () => {
        // Expensive call
        console.log("click")
    }
    const optimisedTriggerHandler = throttleFunc(handlerTrigger, 100);
    const throttleFunc = (func, interval) => {
        let shouldFire = true;
        return function () {
            if (shouldFire) {
                func();
                shouldFire = false;
                // setTimeOut(() => {
                //     shouldFire = true;
                // }, interval)
            }
        }
    }

    window.addEventListener("onclick", optimisedTriggerHandler)
    return (
        <div>
            throtttle
        </div>
    )
}

export default Throttling
