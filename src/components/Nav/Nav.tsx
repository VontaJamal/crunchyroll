import {useEffect, useState} from 'react'
import logo from '../../images/logo.png'
import './Nav.css'

export default function Nav() {
  const [group, setGroup] = useState('')

  //hover over a list item
  useEffect(() => {
    function updateNavArrow() {
      const sheatheArrow = document.querySelector('.active')
      sheatheArrow?.classList.remove('active')
      const drawArrow = document.querySelector(`[data-group="${group}" i] > div`)
      drawArrow?.classList.add('active')
    }
    updateNavArrow()
  }, [group])

  const navItems = ['Updated', 'Popular', 'Simulcasts', 'All']

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLLIElement> & {target: Element}
  ) => {
    const itemGroup = e.target.textContent?.toLowerCase()
    itemGroup && setGroup(itemGroup)
  }

  return (
    <header role='navigation' aria-label='Navbar' className='nav'>
      <div className='logo_container'>
        <img src={logo} alt='The Crunchyroll logo' />
        <p>crunchyroll</p>
      </div>
      <h3 className='animeText'>Anime</h3>
      <ul aria-label='Navigation List'>
        <li onMouseEnter={handleMouseEnter} data-group='updated'>
          <div className='arrow' />
          Updated
        </li>
        <li onMouseEnter={handleMouseEnter} data-group='popular'>
          <div className='arrow' />
          Popular
        </li>
        <li onMouseEnter={handleMouseEnter} data-group='simulcasts'>
          <div className='arrow' />
          Simulcasts
        </li>
        <li onMouseEnter={handleMouseEnter} data-group='all'>
          <div className='arrow' />
          All
        </li>
      </ul>
    </header>
  )
}
