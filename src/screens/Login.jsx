import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import Spinner from '../components/Spinner'

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo!==null) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <main>
      <form className='shadow' onSubmit={handleSubmit(submitForm)}>
        <NavLink to="/">Back to Main Page</NavLink>
        <h1>LOGIN</h1>
        {error && <Error>{error}</Error>}
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
          {loading ? <Spinner />
          : <button type='submit' className='button orange large' disabled={loading}>
              Sign In
            </button>
          }
        <div>
          <span>Don&apos;t have an account yet? Please, <NavLink to='/register'>Sign Up</NavLink></span>
        </div>
    </form>
    </main>
  )
}

export default LoginScreen