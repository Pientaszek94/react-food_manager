import React from 'react'
import "../styles/recipes-modal.scss"

function RecipesModal({recipe}) {
  return (
    <div className='modal-wrapper'>

        <div className='recipe-preview'>
            {recipe}
        </div>

    </div>
  )
}

export default RecipesModal