import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    updateUserInfo:(state, {payload})=>{ //seamless changes

      Object.keys(payload).forEach(key=>{
        state.userInfo[key] = payload[key]
      })

    },
    pushRecipe:(state, {payload})=>{ //seamless changes

      state.userInfo.recipes=[...state.userInfo.recipes, payload]

    },
    pullRecipe:(state, {payload})=>{ //seamless changes

      state.userInfo={
        ...state.userInfo,
        recipes: state.userInfo.recipes.filter((recipe)=>recipe!=payload)
      }

      // state.userInfo.recipes.filter((recipe)=>recipe!=payload)

    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data
    },
  },extraReducers:(builder)=>{

        // userLogin
        builder.addCase(userLogin.pending, (state, action)=>{
            state.loading=true
            state.error = null
        })
        builder.addCase(userLogin.fulfilled, (state, {payload})=>{
            state.loading = false
            state.userInfo = payload.data
            state.userToken = userToken
        })
        builder.addCase(userLogin.rejected, (state, {payload})=>{
            state.loading = false
            state.error = payload.error
        })

        // userRegister
        builder.addCase(registerUser.pending, (state)=>{
            state.loading=true
            state.error = null
            console.log("Pending Registering")
        })
        builder.addCase(registerUser.fulfilled, (state, {payload})=>{
            state.loading = false
            state.success = true
            console.log("Successful Registering")
        })
        builder.addCase(registerUser.rejected, (state, {payload})=>{
            state.loading = false
            state.error = payload.error
        })
    
    }
})

export const { logout, 
              updateUserInfo, 
              setCredentials,
              pushRecipe,
               pullRecipe } = authSlice.actions

export default authSlice.reducer