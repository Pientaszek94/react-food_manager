import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backendURL= 
process.env.NODE_ENV!=="production"
? "http://127.0.0.1:5000/"
: import.meta.env.VITE_SERVER_URL


export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        await axios.post(
          `${backendURL}api/v1/users/`,
          { name, email, password },
          config
        )

      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


  export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        const { data } = await axios.post(
          `${backendURL}api/v1/users/login`,
          { email, password },
          config
        )
  
        // store user's token in local storage
        localStorage.setItem('userToken', data.data.token)
  
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )