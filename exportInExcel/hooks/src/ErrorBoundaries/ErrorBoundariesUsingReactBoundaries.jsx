import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import CounterClass from './CounterClass'

const ErrorBoundariesUsingReactBoundaries = () => {
    const [someKey,setSomeKey]=useState("");
  return (

    <div>
         <ErrorBoundary
        //  FallbackComponent={ErrorFallback}
         onReset={() => setSomeKey(null)} // reset the state of your app here
         resetKeys={[someKey]} // reset the error boundary when `someKey` changes
         >
            <CounterClass />
         </ErrorBoundary>
    </div>
  )
}

export default ErrorBoundariesUsingReactBoundaries
