import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Nav from './Nav'
import {NavItems} from './NavResources'

it('should render the nav component', () => {
  render(<Nav />)
  const navHeader = screen.getByRole('navigation')
  expect(navHeader).toBeInTheDocument()
})

it('should render a ul with a role of Navigation List', () => {
  render(<Nav />)
  const navList = screen.getByLabelText('Navigation List')
  expect(navList).toBeInTheDocument()
})

it('Should have 4 children in the Navigation List', () => {
  render(<Nav />)
  const navListItems = screen.queryAllByRole('listitem')
  expect(navListItems).toHaveLength(4)
})

it('Should add an active class when li is hovered', () => {
  render(<Nav />)
  const navListItem = screen.getByRole('listitem', {name: /updated/i})
  userEvent.hover(navListItem)
  expect(navListItem.querySelector('div')).toHaveClass('active')
})

it('Should have no arrow when first loaded', () => {
  render(<Nav />)
  const hasActiveDiv = document.querySelector('.active')
  expect(hasActiveDiv).toBeNull()
})

describe('Testing the uparrow navigation on the Nav', () => {
  it('Should select the "updated" category when the uparrow is pressed', () => {
    render(<Nav />)
    userEvent.keyboard('{arrowup}')
    const navListItem = screen.getByRole('listitem', {name: /updated/i})
    expect(navListItem.querySelector('div')).toHaveClass('active')
  })

  it('Should cycle through the categories when uparrow is pressed', () => {
    render(<Nav />)
    userEvent.keyboard('{arrowup}') // press one time to set arrow on "Updated"

    const navItemsCopy = [...NavItems]
    navItemsCopy.reverse().forEach((navItem) => {
      userEvent.keyboard('{arrowup}')
      const navListItem = screen.getByRole('listitem', {name: navItem})
      expect(navListItem.querySelector('div')).toHaveClass('active')
    })
  })
})

describe('Testing the down arrow navigation on the Nav', () => {
  it('Should select the "updated" category when downarrow is pressed', () => {
    render(<Nav />)
    userEvent.keyboard('{arrowdown}')
    const navListItem = screen.getByRole('listitem', {name: /updated/i})
    expect(navListItem.querySelector('div')).toHaveClass('active')
  })

  it('Should cycle through the categories when downarrow is pressed', () => {
    render(<Nav />)
    NavItems.forEach((navItem) => {
      userEvent.keyboard('{arrowdown}')
      const navListItem = screen.getByRole('listitem', {name: navItem})
      expect(navListItem.querySelector('div')).toHaveClass('active')
    })
  })
})
