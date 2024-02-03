import React, { Suspense, lazy, startTransition, useState } from 'react'
const Services = lazy(() => import("./Services"));
const About = lazy(() => import("./About"))

const CodeSplittingTab = () => {
    const [tabs, setTabs] = useState("about")

    return (
        <div>
            <button onClick={() => {
                startTransition(() => {
                    setTabs("about")
                })
            }}>about</button>
            <button onClick={() => {
                startTransition(() => {
                    setTabs("services")
                })
            }}>services</button>
            
            <Suspense fallback={<div>....loading</div>}>
                {
                    tabs === 'services' ? <Services /> : <About />
                }
            </Suspense>
        </div>
    )
}

export default CodeSplittingTab
