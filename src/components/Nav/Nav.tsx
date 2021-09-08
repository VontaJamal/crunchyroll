import {useEffect, useState} from 'react'
import logo from '../../images/logo.png'
import './Nav.css'

export default function Nav() {
  const [group, setGroup] = useState('')

  useEffect(() => {
    function updateNavArrow() {
      const sheatheArrow = document.querySelector('.active')
      sheatheArrow?.classList.remove('active')
      const drawArrow = document.querySelector(
        `[data-group="${group}" i] > div`
      )
      drawArrow?.classList.add('active')
    }

    updateNavArrow()
  }, [group])

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLLIElement> & {target: Element}
    ) => {
      const itemGroup = e.target.textContent?.toLowerCase()
      itemGroup && setGroup(itemGroup)
  }

  function renderNavItems() {
    const navItems = ['Updated', 'Popular', 'Simulcasts', 'All']
    return navItems.map((navItem) => (
      <li
        onMouseEnter={handleMouseEnter}
        data-group={`${navItem}`}
        aria-label={`${navItem}`}
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
      <ul aria-label='Navigation List'>
       {renderNavItems()}
      </ul>
    </header>
  )
}
