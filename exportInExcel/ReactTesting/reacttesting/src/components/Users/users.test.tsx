import { render, screen } from "@testing-library/react"
import Users from "./Users"
import { server } from "../../mocks/server";
import { rest } from "msw"
describe("users",()=>{
    test("render successfuly",async()=>{
        render(<Users/>);
        const users = await screen.findAllByRole("Listitem");
        expect(users).toHaveLength(3)
    })


    test("renders error",async()=>{
       server.use(
        rest.get("",
            (req,res,ctx)=>{
                return res(ctx.status(500))
            }
        )
       )
       render(<Users/>)
       const error =await screen.findByText("error")
       expect(error).toBeInTheDocument()
    })
})