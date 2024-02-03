import { render, screen } from "@testing-library/react";
import Greet from "./Greet"

test("Greet renders correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText(/hello/i)
    expect(textElement).toBeInTheDocument()
})


// test driven Development(TDD);
// test before software code

// test.only only this test will run
// test.skip this will skip test

test("Greet render with a name TDD", () => {
    render(<Greet name="Sandesh" />);
    const textElement = screen.getByText(/hello sandesh/i);
    expect(textElement).toBeInTheDocument();
})




// group test with jest

// describe("greet", () => {
//     test("Greet renders correctly", () => {
//         render(<Greet />);
//         const textElement = screen.getByText(/hello/i)
//         expect(textElement).toBeInTheDocument()
//     })

//     test("Greet render with a name TDD", () => {
//         render(<Greet name="Sandesh" />);
//         const textElement = screen.getByText(/hello sandesh/i);
//         expect(textElement).toBeInTheDocument();
//     })

// })


// we can use only and skip with describe block 
// we can make nested describle blocks
// we can make multiple describe blocks

// filename conventions
// .test.js  .test.tsx  .spec.js .spec.tsx   
// folder with __tests__

// test=> it 


// test.only => fit
// test.skip => xit

