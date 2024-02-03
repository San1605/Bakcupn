import React from 'react'
import Details from './Details'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Items from './Items'

const UseOutlet = () => {
  return (
<BrowserRouter>
<Routes>
    <Route path="/" element={<Details/>} />
    <Route path='/items/:id' element={<Items/>} />
</Routes>
</BrowserRouter>
  )
}

export default UseOutlet
