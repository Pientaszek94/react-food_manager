import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../styles/post.scss"
import { useMutation } from '@apollo/client'
import { UPDATE_POST } from '../app/services/cms/mutations'
import { useDispatch } from 'react-redux'
import { usePullUserRecipesMutation, usePushUserRecipesMutation, useUpdateUserMutation } from '../app/services/auth/authService'
import { pullRecipe, pushRecipe, updateUserInfo } from '../features/auth/authSlice'

function Post({post, ...props}) {
  
  const [updatePost]=useMutation(UPDATE_POST)
  const [pushUserRecipes]=usePushUserRecipesMutation()
  const [pullUserRecipes]=usePullUserRecipesMutation()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {userInfo}=props
  const {pathname} = useLocation()
  const [modalPath, setModalPath]=useState('')
  

  useEffect(()=>{
    if(pathname.includes("user-profile")){
      setModalPath("favrecipes")
    }
    else{
      setModalPath("recipes")
    }
  },[])



  const updatePostsLikes=async()=>{

        console.log("Clicked Like")
        let postsLikes=post?.likes
        const indexRecipe=userInfo.recipes.findIndex((recipe)=>recipe==post.slug)
        console.log("index", indexRecipe)
        if(indexRecipe==-1){
          ++postsLikes
          await pushUserRecipes({recipes:post.slug}).unwrap()
                .then((payload)=>{
                  dispatch(pushRecipe(post.slug))
                  updatePost({variables:{likes:postsLikes, id: post.id}})
                })
              }
              else {
                --postsLikes
                await pullUserRecipes({recipes:post.slug}).unwrap()
                .then((payload)=>{
                  console.log("Success PUSH")
                  dispatch(pullRecipe(post.slug))
                  updatePost({variables:{likes:postsLikes, id: post.id}})
                })
        } 

  }



  
  const navigateToRecipe=()=>{ 
    navigate(modalPath+"/"+post.slug, {state:{ background: props.location }})
  }
  
  return (
    <div className='post'>
      
      {
        userInfo?(
              <h4 className={`heart ${userInfo?.recipes?.findIndex((recipe)=> recipe==post.slug)!=-1?"orange-txt":""}`} 
                 onClick={updatePostsLikes} >                    
                <span className="material-symbols-outlined">
                  favorite
                </span>
              </h4>
        ):null
      }

              <h4 className='timer'>
                  <span className="material-symbols-outlined">
                      timer
                  </span>  
                  {" "+post.cookingTime+" mins"}
              </h4>
        <div
            style={{
                backgroundImage:`url(${post.foodImages[0]?.url})`,
                backgroundPosition:"center",
                backgroundSize:"cover"
                }}>
                  <div className='blacken' onClick={navigateToRecipe}/>
        </div>

        <h5 onClick={navigateToRecipe}>
            {post.title.toUpperCase()}
        </h5>

    </div>
  )
}

export default Post