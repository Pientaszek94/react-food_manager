import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = ({userInfo}) => {

  if (!userInfo) {
    return (
      <div className='unauthorized'>
        <main>
          <h1>Unauthorized</h1>
          <span>
            <NavLink to='/login'>Login</NavLink> to gain access
          </span>
        </main>
      </div>
    )
  }

  return <Outlet />
}

export default ProtectedRoute