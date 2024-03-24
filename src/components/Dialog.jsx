import React from 'react'
import "../styles/dialog.scss"

function Dialog({dialogRef, children}) {


    const closeModal=(e)=>{
        e.preventDefault()
        dialogRef.current.close()
    }
      
  return (
    <dialog id="dialog" ref={dialogRef}>
        <button className='small-btn cross' onClick={closeModal}>
            <span className="material-symbols-outlined">
              add
            </span>
        </button>
        {children}
    </dialog>
  )
}

export default Dialog