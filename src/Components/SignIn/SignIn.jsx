import './SignIn.css'
import { axios } from '@/instances/axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Redirect } from 'react-router-dom'
// import background from '../';
SignIn.prototype = {}
// Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'redirect',
//   signInSuccessUrl: '/home',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
// }
function SignIn() {
  const [account, setAcount] = useState({
    username: '',
    password: '',
  })
  const [isRedirect, setIsRedirect] = useState(false)
  const changAccount = (event) => {
    setAcount({ ...account, [event.target.name]: event.target.value })
  }
  useEffect(async () => {
    const local = localStorage['userToken']
    axios.defaults.headers.common['Authorization'] = `Bearer ${local}`
    const verifytoken = await axios.get('/auth')
    if (verifytoken.success == true)
      setAcount({ ...account, isAuthentication: true })
  }, [])
  const LoginForm = async (event) => {
    event.preventDefault()
    const { username, password } = account
    const loginData = await axios.post('/auth/login', {
      username,
      password,
    })
    console.log(loginData)
    const notifySignIn = () => {
      toast(loginData.data?.message, {
        className: 'notify-sign-in',
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      })
    }
    if (loginData.data?.jwt) {
      localStorage.setItem('id', loginData.data.user.id)
      localStorage.setItem('token', loginData.data.jwt)
    }
    if (loginData.data?.sucess === false) {
      notifySignIn()
    } else {
      setIsRedirect(true)
    }
  }

  if (isRedirect == true) return <Redirect to="/home" />

  return (
    <div className="container">
      <ToastContainer draggable={false} transition={Bounce} autoClose={4000} />
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Sign In</h3>
          </div>
          <div className="card-body">
            <form onSubmit={LoginForm}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  onChange={changAccount}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={changAccount}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="submit"
                  defaultValue="Login"
                  className="btn float-right login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don{"'"}t have an account?<Link to="/sign-up">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
