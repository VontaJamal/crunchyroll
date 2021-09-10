import {Reducer, useEffect, useReducer} from 'react'
import {useKeypress} from '../utils/customHooks'
import {titleCase} from '../utils/helpers'
import {NavActions} from './NavActions'
import {NavType} from './NavTypes'
import logo from '../../images/logo.png'
import './Nav.css'

const navItems = ['Updated', 'Popular', 'Simulcasts', 'All']

const categories = {
  UPDATED: 'updated',
  POPULAR: 'popular',
  SIMULCASTS: 'simulcasts',
  ALL: 'all',
}

type NavState = {
  category: string
  isUpPressed: boolean
  isDownPressed: boolean
}

const navReducer: Reducer<NavState, NavType> = (state, action) => {
  switch (action.type) {
    case NavActions.SET_UPDATED:
      return {
        isDownPressed: false,
        isUpPressed: false,
        category: categories.UPDATED,
      }

    case NavActions.SET_ALL:
      return {
        isUpPressed: false,
        isDownPressed: false,
        category: categories.ALL,
      }

    case NavActions.SET_UPARROW_PRESSED:
      const category = action.payload || state.category
      return {...state, isUpPressed: true, category}

    case NavActions.SET_UPARROW_NOT_PRESSED:
      return {...state, isUpPressed: false}

    case NavActions.SET_CURRENT:
      return {
        isUpPressed: false,
        isDownPressed: false,
        category: action.payload || '',
      }

    default:
      return {...state}
  }
}

const initialState = {
  category: '',
  isUpPressed: false,
  isDownPressed: false,
}

export default function Nav() {
  const [navState, dispatch] = useReducer(navReducer, initialState)
  const {isUpPressed, isDownPressed} = navState
  const category = navState.category?.toLowerCase()

  useKeypress('arrowdown', dispatch)
  useKeypress('arrowup', dispatch)

  useEffect(() => {
    function updateArrow() {
      const sheatheArrow = document.querySelector('.active')
      sheatheArrow?.classList.remove('active')
      const drawArrow = document.querySelector(
        `[data-group="${category}" i] > div`
      )
      drawArrow?.classList.add('active')
    }
    updateArrow()
  }, [category])

  useEffect(() => {
    function handleUpArrowPress() {
      if (isUpPressed) {
        if (!category) dispatch({type: NavActions.SET_UPDATED})
        if (category) {
          if (category === categories.UPDATED) {
            dispatch({type: NavActions.SET_ALL})
          } else {
            const categoryIndex = navItems.indexOf(titleCase(category))
            if (categoryIndex > -1)
              dispatch({
                type: NavActions.SET_CURRENT,
                payload: navItems[categoryIndex - 1],
              })
          }
        }
      }
    }

    handleUpArrowPress()
  }, [isUpPressed, category])

  useEffect(() => {
    if (isDownPressed) console.log('down?', isDownPressed)
  }, [isDownPressed])

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLLIElement> & {target: Element}
  ) => {
    const itemGroup = e.target.textContent?.toLowerCase()
    itemGroup && dispatch({type: NavActions.SET_CURRENT, payload: itemGroup})
  }

  function renderNavItems() {
    return navItems.map((navItem) => (
      <li
        onMouseEnter={handleMouseEnter}
        data-group={`${navItem}`}
        aria-label={`${navItem}`}
        key={navItem}
      >
        <div className='arrow' />
        {`${navItem}`}
      </li>
    ))
  }

  return (
    <header role='navigation' aria-label='Navbar' className='nav'>
      <div className='logo_container'>
        <img src={logo} alt='The Crunchyroll logo' />
        <p>crunchyroll</p>
      </div>
      <h3 className='animeText'>Anime</h3>
      <ul aria-label='Navigation List'>{renderNavItems()}</ul>
    </header>
  )
}
