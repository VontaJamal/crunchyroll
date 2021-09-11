import {useEffect, useReducer} from 'react'
import logo from '../../images/logo.png'
import {useKeypress} from '../utils/customHooks'
import {titleCase} from '../utils/helpers'
import {
  NavActions,
  NavCategories,
  NavItems,
  NavKeys,
  navReducer,
} from './NavResources'
import './Nav.css'

const initialState = {
  category: '',
  isUpPressed: false,
  isDownPressed: false,
}

export default function Nav() {
  const [navState, dispatch] = useReducer(navReducer, initialState)
  const {isUpPressed, isDownPressed} = navState
  const category = titleCase(navState.category)

  useKeypress(NavKeys.ARROWUP, dispatch)
  useKeypress(NavKeys.ARROWDOWN, dispatch)

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
    function handleArrowPress() {
      if (isUpPressed || isDownPressed) {
        if (!category) dispatchUpdate()
        else dispatchCurrent()
      }
    }

    function dispatchUpdate() {
      dispatch({type: NavActions.SET_UPDATED})
    }

    function dispatchCurrent() {
      if (isUpPressed && category === NavCategories.UPDATED)
        dispatch({type: NavActions.SET_ALL})
      else if (isDownPressed && category === NavCategories.ALL)
        dispatch({type: NavActions.SET_UPDATED})
      else {
        const categoryIndex = category
          ? NavItems.indexOf(titleCase(category))
          : -1
        if (categoryIndex > -1) {
          const currentCategoryIndex = isUpPressed
            ? categoryIndex - 1
            : categoryIndex + 1
          dispatch({
            type: NavActions.SET_CURRENT,
            payload: NavItems[currentCategoryIndex],
          })
        }
      }
    }

    handleArrowPress()
  }, [category, isUpPressed, isDownPressed])

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLLIElement> & {target: Element}
  ) => {
    const itemGroup = e.target.textContent?.toLowerCase()
    itemGroup && dispatch({type: NavActions.SET_CURRENT, payload: itemGroup})
  }

  function renderNavItems() {
    return NavItems.map((navItem) => (
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
