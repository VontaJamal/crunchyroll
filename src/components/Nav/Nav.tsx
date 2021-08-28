import './Nav.css'
import logo from '../../images/logo.png'

export default function Nav() {
  return (
    <header role='navigation' aria-label='Navbar' className='nav'>
      <div className="logo_container">
        <img src={logo} alt='The Crunchyroll logo'/>
        <p>crunchyroll</p>
      </div>
      <h2 className="animeText">Anime</h2>
      <ul aria-label='Navigation List'>
        <li>Updated</li>
        <li>Popular</li>
        <li>Simulcasts</li>
        <li>All</li>
      </ul>
    </header>
  )
}
