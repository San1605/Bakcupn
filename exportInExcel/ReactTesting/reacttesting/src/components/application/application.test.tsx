import { render, screen } from "@testing-library/react";
import GetbyRole from "./GetbyRole"

describe("Application",()=>{
    test("renders correctly",()=>{
        render(<GetbyRole/>);
        const nameElement= screen.getByRole("textbox");
        expect(nameElement).toBeInTheDocument();

        const jobLocationElement=screen.getByRole("combobox");
        expect(jobLocationElement).toBeInTheDocument();
        
        const termsElement=screen.getByRole("checkbox");
        expect(termsElement).toBeInTheDocument();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();


        const labelElement = screen.getByLabelText("Name",{
            selector:"input"
        });
        expect(labelElement).toBeInTheDocument();

        const byPlaceHolder=screen.getByPlaceholderText("please enter name here");
        expect(byPlaceHolder).toBeInTheDocument();

        
        const paraElement= screen.getByText("Hello");
        expect(paraElement).toBeInTheDocument()

        const inputValue = screen.getByDisplayValue("input");
        expect(inputValue).toBeInTheDocument();
        // mulitple elements in DOM
    // use all for all queries
    })
})




// priority order of queries
/*
getByRole
getByLabelText
getByPlaceholderText
getByText
getByDisplayValue
getByAltText   image
getByTitle
getByTestId

*/


