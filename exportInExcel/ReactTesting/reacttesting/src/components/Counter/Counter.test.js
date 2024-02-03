import { render,screen } from "@testing-library/react"
import Counter from "./Counter"
import userEvent from "@testing-library/user-event"

describe("counter", () => {
    test("renders correctly", () => {
        render(<Counter />)
        const countElement = screen.getByRole("heading")
        expect(countElement).toBeInTheDocument();
        const incrementButton = screen.getByRole("button", {
            name: "increment"
        })
        expect(incrementButton).toBeInTheDocument();
    })

    test("render a count of 0", () => {
         render(<Counter/>);
         const countElement= screen.getByRole("heading");
         expect(countElement).toHaveTextContent("0")
    })

    test("renders a count of 1 after user click", async() => {
        userEvent.setup(); 
        render(<Counter/>);
        const incrementButton = screen.getByRole("button",{
            name:"increment"
        })
        await userEvent.click(incrementButton);
        const countElement= screen.getByRole("heading");
        expect(countElement).toHaveTextContent("1")
    })

    test("render input field ",async()=>{
        userEvent.setup();
         render(<Counter/>)
        const inputElement=screen.getByRole("spinbutton");
        await userEvent.type(inputElement,"10");
        expect(inputElement).toHaveValue(10);
        const setButton = screen.getByRole("button",{
            name:"set"
        })
        await userEvent.click(setButton);
        const countElement=screen.getByRole("heading");
        expect(countElement).toHaveTextContent("10");
    })


     test("to check focus",async()=>{
        userEvent.setup()
        render(<Counter/>);
        const inputElement= screen.getByRole("spinbutton")
        const incrementButton= screen.getByRole("button",{
            name:"increment"
        })
        const setButton=screen.getByRole("button",{
            name:'set'
        })
        await userEvent.tab();
        expect(incrementButton).toHaveFocus();

        await userEvent.tab();
        expect(inputElement).toHaveFocus();

        await userEvent.tab();
        expect(setButton).toHaveFocus(); 
     })

})



// provider wrapper

// render(<Counter/>,{
//     wrapper:AppProvider
// })

// if you want to test a custom hook
// useRenderHook, 

/*
  const {result} = renderHook(useCounter,{
    initialPorps:{
        intialCount:0
    }
  })
  expect(result.current.count).toBe(10)
*/