import { useEffect, useState } from 'react'
import "react-image-crop/dist/ReactCrop.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { Home, Login, Profile, Register, Loading } from './screens'
import ProtectedRoute from './routing/ProtectedRoute'
import { Footer, Header, Recipe } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from './app/services/auth/authService';
import { setCredentials } from './features/auth/authSlice';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from './app/services/cms/queries';
import RecipesModal from './components/RecipesModal';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


function App() {
  const location= useLocation()
  const background = location.state && location.state.background;
  const {pathname}=useLocation()
  const dispatch=useDispatch()
  
  useEffect(()=>{
    document.title="FM "+pathname.split("/").slice(-1)
  },[pathname])

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 9000000,
  })
  
  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  const {userInfo}=useSelector((state)=> state.auth)
    console.log("userInfo", userInfo)
    
  const postsApi=useQuery(GET_POSTS)
    const posts=postsApi?.data?.posts
    console.log("postApi", posts)

  
  return (
    <div className="app">
          <Header isFetching={isFetching} userInfo={userInfo}/>
          <div className="container">
         
                {(isFetching||postsApi.loading)?(<Loading/>)
                  :(
                    <Routes location={background || location}>
                      <Route path='/' element={<Navigate to='/home' replace />} />
                      <Route path='/home' element={<Home postsList={posts} userInfo={userInfo}/>}>
                        <Route path="/home/recipes/:slug" element={<RecipesModal recipe={<Recipe  postsList={posts} userInfo={userInfo}/>}/>}/>
                      </Route>
                      <Route path='/register' element={<Register/>} />
                      <Route path='/login' element={<Login/>}/>

                      <Route element={<ProtectedRoute userInfo={userInfo}/>}>
                        <Route path='/user-profile' element={<Profile userInfo={userInfo} postsList={posts}/>}>
                          <Route path="/user-profile/favrecipes/:slug" 
                                  element={<RecipesModal 
                                                  recipe={<Recipe userInfo={userInfo} 
                                                                  postsList={posts?.filter((post)=>{
                                                                    const isIndex=userInfo?.recipes
                                                                                  ?.findIndex(recipe=>post.slug==recipe)
                                                                    if(isIndex!=-1){
                                                                        return post
                                                                    }
                                                                  })}
                                                        />}
                                          />} 
                          />
                        </Route>
                      </Route>

                    </Routes>
                      )
                }
                {(isFetching||postsApi.loading)?null
                  :<Footer/>
                }
          </div>
    </div>
  )
}
// {background && (
//   <Routes>
//     <Route path="recipes/:slug" element={<RecipesModal/>} />
    
//   </Routes>
// )}

export default App
