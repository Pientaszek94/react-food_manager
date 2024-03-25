import { useEffect, useState } from 'react'
import "../styles/header.scss"
import { useDispatch } from 'react-redux'
import { NavLink, useLocation} from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import Logo from './Logo'
import noprofile from '../assets/no-profile.svg'

function Header({isFetching, userInfo}) {

    const [position, setPosition] = useState(window.pageYOffset)
    const [visible, setVisible] = useState(true)
    const {pathname} = useLocation()
    const dispatch=useDispatch()

    useEffect(()=> {
        const handleScroll = () => {
           let moving = window.pageYOffset
           
           setVisible(position > moving);
           setPosition(moving)
        }
        window.addEventListener("scroll", handleScroll);

        return(() => {
           window.removeEventListener("scroll", handleScroll);
        })

    })

    const cls = visible ? "visible" : "hidden";


    if (pathname=="/login"||pathname=="/register")
        return
    else
        return (
            <header className={`${cls} header shadow`}>
                
                <Logo/>

                {isFetching
                ? (
                    <div className='profile-menu'>
                        <div>Your profile is currently loading...</div>
                    </div>
                )
                : userInfo!== null
                ? ( <div className='profile-menu'>
                        <div>
                            {
                                userInfo?.image?(
                                    <img src={userInfo?.image} alt="profile" style={{width:"40px", aspectRatio:"1"}} />
                                ):(
                                    <img src={noprofile} alt="profile" style={{width:"40px", aspectRatio:"1"}} />
                                )
                            }
                            {userInfo?.name}
                        </div>
                        <ul>{pathname!=="/user-profile"
                                ?<li>
                                    <NavLink className="orange" to='/user-profile'>
                                        My Profile
                                    </NavLink>
                                </li>
                                :null
                            }
                            <li>
                                <div className='orange' onClick={() => dispatch(logout())}>
                                    Logout
                                </div>

                            </li>
                        </ul>
                    </div>)
                : (
                    <div>
                        <NavLink className='signIn' to='/login'>
                            SignIn
                        </NavLink>
                    </div>    
                )}

            </header>
        )
}

export default Header