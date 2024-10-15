import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { googlelogin, loginuser } from '../../services/action/signup.action';


const Login = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({ ...prevLogin, [name]: value }));
  };

  const handlegoogle = () =>{
      dispatch(googlelogin())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.email && login.password) {
      dispatch(loginuser(login.email, login.password));
    }
  };

  if (isLogin) {
    navigate('/home');
    return null; 
  }

  return (
    <section className='form-01-main'>
      <div className='form-cover'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="_main_head_as">
                <a href="#">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDjbQ-2HcLywyVxjhrHZmUFxxDCtCGKC8b3w-ROgVag&s" alt="" />
                </a>
              </div>
              <form action="#" onSubmit={handleSubmit} className="login-form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className="login-button">Login</Button>
              </form>
              <p onClick={handlegoogle} className='text-white login-google'>Log in with Google <a href="#" className='text-primary'>Click Me</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;