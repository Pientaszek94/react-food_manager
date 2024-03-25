import { useEffect, useState } from 'react'
import Post from './Post'
import "../styles/posts.scss"
import "../styles/recipes-tiles.scss"
import { useLocation } from 'react-router-dom'
function Posts(props) {
    const {postsList, userInfo}=props
    const [posts, setPosts] = useState(new Array())
    const {pathname} = useLocation()
    const [postIndex, setPostIndex]=useState(14)
    useEffect(()=>{
        if(postsList){

            for(let i=0;i<=5;i++){
                setPosts((prevPosts)=>prevPosts.concat(postsList[0]))
                setPosts((prevPosts)=>prevPosts.concat(postsList[1]))
            }
        }
            
    },[postsList])

    const loadMore=()=>{
        setPostIndex(prevState=> prevState+6)   
    }

    if (pathname.includes("home")){
        return (
            <div className='posts'>
                <div className="grid-posts">
                    <div className="first-row">
                        {
                            posts?.slice(0,3).map((post, i)=>(
                                <Post {...props} post={post} key={i}/>
                            ))
                        }
                        
                    </div>
                    <div className='second-row'>
                        {
                            posts?.slice(4,7).map((post, i)=>(
                                <Post {...props} post={post} key={i}/>
                            ))
                        }
                        
                    </div>
                </div>
                <div className="recommand">
                    <span>We also recommand</span>
                </div>
                <div className="other-rows">
                    {
                        posts?.slice(8, postIndex).map((post, i)=>(
                            <Post {...props} post={post} key={i}/>
                        ))
                    }
                </div>
                {
                    postIndex<=posts.length && (
                        
                        <button className='button large orange' onClick={loadMore}>Load more</button>
                    )
                }
            </div>
          ) 
    }
    else if(userInfo!=null && pathname.includes("user-profile")){
        // if(pathname=="/user-profile"||pathname=="/user-profile/favrecipes") 
        return(
            <div className='recipes'>
                {
                    postsList
                    .filter((post)=>{
                        const isIndex=userInfo?.recipes
                                ?.findIndex(recipe=>post.slug==recipe)
                        if(isIndex!=-1){
                            return post
                        }
                    })
                    .map((post, i)=>{
                        
                      return  <Post {...props} post={post} key={i}/>

                    })
                }
            </div>
        )
    }


}

export default Posts