import { logRoles, render, screen } from "@testing-library/react"
import Skills from "./Skills"


describe("skills", () => {

    test("skills login button test", () => {
        render(<Skills skills={["HTML", "CSS", "JS"]} />)
        const loginButton = screen.getByRole("button", {
            name: "Login"
        });
        expect(loginButton).toBeInTheDocument();
    })
// not present in dom


    test("start learning button not rendered", () => {
        render(<Skills skills={["HTML", "CSS", "JS"]} />)
        const startLearningButton = screen.queryByRole("button", {
            name: "start learning"
        })
        expect(startLearningButton).not.toBeInTheDocument();

    })

// appearance test appear after some time use find
    test("start learning button eventually",async()=>{
       const view=   render(<Skills skills={["HTML", "CSS", "JS"]} />)
       logRoles(view.container)
        // screen.debug()
        const startLearningButton = await screen.findByRole("button",{
            name:"start learning"
        },{
            timeout:2000
        }) 
        expect(startLearningButton).toBeInTheDocument();
    })
})