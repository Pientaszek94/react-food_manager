import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import {Error, Spinner} from '../components'
import { registerUser } from '../features/auth/authActions'

function Register() {

    const [customError, setCustomError] = useState(null)
    
    const {loading, userInfo, error, success}=useSelector(
        (state)=>state.auth
    )
    const dispatch=useDispatch()

    const {register, handleSubmit}=useForm()
    const navigate=useNavigate()


    useEffect(()=>{
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/user-profile')
        // redirect user to login page if registration was successful
        if (success) navigate('/login')

    },[navigate, userInfo, success])

    const submitForm=(data)=>{
        if (data.password!==data.confirmPassword){
            setCustomError('Password mismatch')
            return
        }
        data.email=data.email.toLowerCase()

        // asyncFunction(data)

        dispatch(registerUser(data))
        console.log("DATA: ",data)
    }

    // asyncFunction for testing purposes


    return (
        <main> 

           <form className='shadow' onSubmit={handleSubmit(submitForm)}>
                <NavLink to="/">Back to Main Page</NavLink>
                <h1>Register</h1>
                {error && <Error>{error}</Error>}
                {customError && <Error>{customError}</Error>}
                <div className='form-group' aria-label='Name'>
                    <label htmlFor='name'>Name</label>
                    <input
                    type='text'
                    className='form-input'
                    {...register('name')}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                    type='email'
                    className='form-input'
                    {...register('email')}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    className='form-input'
                    {...register('password')}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Confirm Password</label>
                    <input
                    type='password'
                    className='form-input'
                    {...register('confirmPassword')}
                    required
                    />
                </div>
                {loading ? <Spinner />
                    :<button type='submit' className='button orange large' disabled={loading}>
                        Sign In
                    </button>
                }
                <div>
                    <span>Already have an account? Please, <NavLink to='/login'>Sign In</NavLink></span>
                </div> 
             </form>
        </main>
    )
}

export default Register