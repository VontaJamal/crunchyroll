import './Nav.css'

export default function Nav() {
  return (
    <header role='navigation' aria-label='Navbar' className='nav'>

      <ul aria-label='Navigation List'>
        <li>Updated</li>
        <li>Popular</li>
        <li>Simulcasts</li>
        <li>All</li>
      </ul>
    </header>
  )
}
