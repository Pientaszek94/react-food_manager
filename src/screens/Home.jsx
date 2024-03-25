import "../styles/home.scss"
import { Posts } from '../components'
import { Outlet } from 'react-router-dom';
function Home({postsList, userInfo}) {

  return (
    <div className='home'>
      <Outlet/>
      <main>
        <div className="hero">
          <h1>MINIMUM EFFORT MAXIMUM  JOY</h1>
        </div>
        <Posts postsList={postsList} userInfo={userInfo}/> 
      </main>
    </div>
  )
}

export default Home

