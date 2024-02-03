import { render, screen } from "@testing-library/react"
import Counter2 from "./Counter2"
import userEvent from "@testing-library/user-event"

describe("counter2", () => {
    test("render counter", () => {
        render(<Counter2 count={0} />)
        const textElement = screen.getByText("Counter 2");
        expect(textElement).toBeInTheDocument();
    })

    test("handlers", async () => {
        userEvent.setup();
        const handleIncrement = jest.fn();
        const handleDecrement = jest.fn();
        render(
            <Counter2
                count={0}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
            />
        )
        const incrementButton = screen.getByRole("button", { name: "increment" })
        const decrementButton = screen.getByRole("button", { name: "decrement" })
        await userEvent.click(incrementButton);
        await userEvent.click(decrementButton)
        expect(incrementButton).toHaveBeenCalledTimes(1);
        expect(decrementButton).toHaveBeenCalledTimes(1);
    })
})