import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
// import About from './About';
// import Services from './Services';
const Services = lazy(() => import("./Services"))
const About = lazy(() => import("./About"))
// import("./math").then(math => {
//     console.log(math.add(16, 26));
//   });
const CodeSpliting = () => {
    console.log("I am code spliting component")
    return (
        <div>
            <BrowserRouter>
                <Home />
                <Suspense fallback={<div>Wait i am lazy loading... in a bit </div>}>
                    <Routes>
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/services" element={<Services />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}

export default CodeSpliting
