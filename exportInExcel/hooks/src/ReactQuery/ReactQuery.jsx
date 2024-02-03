import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './Components/About'
import Home from './Components/Home'
import Toppings from './Components/Toppings'
import RQToppings from './Components/RQToppings'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Post from './Components/Post'
import ParallelQueries from './Components/ParallelQueries'
import DynamicParallel from './Components/DynamicParallel'
import Paginated from './Components/Paginated'
import InfiniteQuery from './Components/InfiniteQuery'
import PostApi from './Components/PostApi'
const ReactQuery = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/posts' element={<Toppings />} />
                    <Route path='/rq_posts' element={<RQToppings />} />
                    <Route path='/post/:id' element={<Post />} />
                    <Route path='/parallel' element={<ParallelQueries />} />
                    <Route path='/dynamic_parallel' element={<DynamicParallel id={[1,3]} />} />
                    <Route path='/paginated' element={<Paginated/>} />
                    <Route path='/infinte' element={<InfiniteQuery/>} />
                    <Route path='/postapi' element={<PostApi/>} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
export default ReactQuery