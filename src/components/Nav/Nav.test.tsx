import { render, screen } from "@testing-library/react";
import App from "../../App";
import Nav from "./Nav";

it('should render the nav component', () => {
  render(<Nav/>)
  const navList = screen.getByRole('navigation')
  expect(navList).toBeInTheDocument()
})