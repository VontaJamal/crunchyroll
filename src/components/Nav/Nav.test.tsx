import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

it('should render the nav component', () => {
  render(<Nav/>)
  const navHeader = screen.getByRole('navigation')
  expect(navHeader).toBeInTheDocument()
});

it('should render a ul with a role of Navigation List', () => {
  render(<Nav/>)
  const navList = screen.getByLabelText('Navigation List')
  expect(navList).toBeInTheDocument()
})

it('Should have 4 children in the Navigation List', () => {
  render(<Nav/>)
  const navListItems = screen.queryAllByRole('listitem');
  expect(navListItems).toHaveLength(4)
})
