import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import "../styles/recipe.scss"
import Logo from './Logo'


function Recipe({postsList, userInfo}) {
    const [checkedIndex, setCheckedIndex]=useState()
    const navigate=useNavigate()
    const {pathname}=useLocation()
    const {slug}=useParams()
    const [currentRecipe, setCurrentRecipe] = useState()
    const baseURl=pathname.split("/").slice(0,3).join("/")

    useEffect(()=>{
        setCurrentRecipe(postsList?.findIndex((obj)=> slug==obj.slug))
        setCheckedIndex(postsList?.findIndex((obj)=> slug==obj.slug))
      },[slug, postsList])

    const nextRecipe=()=>{
        navigate(baseURl+"/"+postsList[currentRecipe+1]?.slug)
    }
    const prevRecipe=()=>{
        navigate(baseURl+"/"+postsList[currentRecipe-1]?.slug)
    }

    const checkNext=()=>{
            setCheckedIndex(prevState=> prevState+1)
    
    }
    const checkPrev=()=>{
            setCheckedIndex(prevState=> prevState-1)
    }
    

//     const updatePostsLikes=async()=>{

//         console.log("Clicked Like")
//         let postsLikes=post?.likes
//         const indexRecipe=userInfo.recipes.findIndex((recipe)=>recipe==post.slug)
//         console.log("index", indexRecipe)
//         if(indexRecipe==-1){
//           ++postsLikes
//           await pushUserRecipes({recipes:post.slug}).unwrap()
//                 .then((payload)=>{
//                   dispatch(pushRecipe(post.slug))
//                   updatePost({variables:{likes:postsLikes, id: post.id}})
//                 })
//         }
//         else {
//             --postsLikes
//             await pullUserRecipes({recipes:post.slug}).unwrap()
//             .then((payload)=>{
//                 console.log("Success PUSH")
//                 dispatch(pullRecipe(post.slug))
//                 updatePost({variables:{likes:postsLikes, id: post.id}})
//             })
//         } 

//   }


  return (
    <>
            <header>
                <Logo/>

                <button className='orange' onMouseEnter={()=>currentRecipe>0?checkPrev():null} 
                                            onMouseLeave={()=>currentRecipe>0?checkNext():null}
                                            onClick={prevRecipe} disabled={currentRecipe==0}>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </button>

                <div className="recipe-previews-container">
                    <div className='slider' style={{height:`${47*postsList?.length}px`, marginTop:`${-47 * checkedIndex}px`}}>
                        {
                            postsList?.map((recipe)=>(
                                <div className='slides' key={recipe.id}>
                                    <h4>
                                        {recipe.title.toUpperCase()}
                                    </h4>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <button className='orange' onMouseEnter={()=>currentRecipe>=postsList?.length-1?null:checkNext()} 
                                            onMouseLeave={()=>currentRecipe>=postsList?.length-1?null:checkPrev()}
                                            onClick={nextRecipe} disabled={currentRecipe>=postsList?.length-1}>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button>

                <button className='transp-bg' onClick={()=> navigate(pathname.split("/").slice(0,2).join("/"))}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </header>
            <div className='recipe-grid'>
                <div className='image-carousel'>
                    <div className="slider"
                        style={{width:`${100*postsList?.length}%`, marginLeft:`${-100 * currentRecipe}%`}}>

                        {
                            postsList?.map((recipe)=>(
                                <div className='slides' key={recipe.id}
                                style={{
                                    backgroundImage:`url(${recipe.foodImages[0]?.url})`,
                                    backgroundPosition:"center",
                                    backgroundSize:"cover"
                                        }}></div>
                                ))
                        }
                    </div>
                </div>
                <div className="recipes-carousel">
                    <div className="slider"
                            style={{width:`${100*postsList?.length}%`, marginLeft:`${-100 * currentRecipe}%`}}>

                        {
                            postsList?.map((recipe)=>(
                                <div className='slides' key={recipe.id}>
                                        <div className='info-recipe'>
                                            <h4>                    
                                                <span className="material-symbols-outlined">
                                                favorite 
                                                </span>
                                                {" "+recipe.likes}
                                            </h4>
                                            <h4 className='timer'>
                                                <span className="material-symbols-outlined">
                                                    timer
                                                </span>  
                                                {" "+recipe.cookingTime+" mins"}
                                            </h4>
                                            <h4 className='portions'>
                                                <span className="material-symbols-outlined">
                                                    safety_divider
                                                </span>
                                                {" "+recipe.portions}
                                            </h4>
                                        </div>
                                        <div className='desc-recipe'>
                                            <div>
                                                <h2>
                                                    FM
                                                </h2>
                                            </div>
                                            <h4>
                                                {recipe.description+" "}
                                            
                                            </h4>
                                        </div>
                                        <div className="recipe-list-steps">
            
                                            <div className='recipe-list'>
                                                <h3>Ingredients</h3>
                                                <div dangerouslySetInnerHTML={{__html:recipe.productList.html}}/>
                                            </div>

                                            <div className='recipe-steps'>
                                                <h3>Recipes Steps</h3>
                                                <div dangerouslySetInnerHTML={{__html:recipe.content.html}}/>
                                            </div>
                                        </div>
                                </div>
                                    ))
                        }
                    </div>
                </div>
            </div>
    </>
  )
}

export default Recipe