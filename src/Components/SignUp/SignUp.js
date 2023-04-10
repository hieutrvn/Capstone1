import React, { Component } from 'react'
import './SignUp.css'
import { axios } from '@/instances/axios'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirect: false,
      fullname: '',
      username: '',
      password: '',
      phone: '',
      birthday: '',
      user_type: '',
      password2: '',
    }
  }
  content(event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      [name]: value,
    })
  }
  async LoginForm(event) {
    event.preventDefault()
    const notifyPassword = () => {
      toast(`Password doesn${"'"}t match`, {
        className: 'message',
      })
    }
    if (this.state.password !== this.state.password2) {
      notifyPassword()
      this.setState({
        isRedirect: false,
      })
    } else if (this.state.password === this.state.password2) {
      const { fullname, phone, birthday, username, password, user_type } =
        this.state
      const loginData = await axios.post('/auth/register', {
        fullname,
        phone,
        birthday,
        username,
        password,
        user_type,
      })
      console.log(loginData)
      const notifySignUp = () => {
        toast(loginData.data?.message, {
          className: 'message',
        })
      }
      if (loginData.data?.sucess === false) {
        notifySignUp()
        this.setState({
          isRedirect: false,
        })
      } else {
        this.setState({
          isRedirect: true,
        })
      }
    } else {
      this.setState({
        isRedirect: false,
      })
    }
  }
  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />
    }
    return (
      <div className="sign-up">
        <ToastContainer
          draggable={false}
          transition={Bounce}
          autoClose={7000}
        />
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(event) => this.LoginForm(event)}>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id=""
                      aria-describedby=""
                      placeholder="Fullname"
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id=""
                      aria-describedby="emailHelp"
                      placeholder="Username"
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
                      onChange={(event) => this.content(event)}
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
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
                      onChange={(event) => this.content(event)}
                      name="password2"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Confirm password"
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-phone"></i>
                      </span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-calendar-alt"></i>
                      </span>
                    </div>
                    <input
                      type="date"
                      name="birthday"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id
                      placeholder="Birthday"
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-user-tag"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      onChange={(event) => this.content(event)}
                      name="user_type"
                    >
                      <option>Role</option>
                      <option name="user_type" value="Teacher">
                        Teacher
                      </option>
                      <option name="user_type" value="Student">
                        Student
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      defaultValue="Login"
                      className="btn float-right login_btn"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
