import { NavLink } from 'react-router-dom'

function Logo() {
  return (
    <NavLink to="/home" className="logo">
        <span>
            FOOD
        </span>
        <p>
            MANAGER
        </p>
    </NavLink>
  )
}

export default Logo