import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = "http://localhost:8080/api/";

// import axios from "../../../config/axios";
// import axios from 'axios';
function User() {
    const [signIn, setSignIn] = useState(true);
    const [name, setName] = useState("admin");
    const [email, setEmail] = useState("admin@email.com");
    const [password, setPassword] = useState("admin");
    const navaigate = useNavigate();
    const signUpOrSignIn = ()=>{
      if(signIn){
        setName(()=> "")
        setEmail(()=> "")
        setPassword(()=> "")
      } else{
        setName(()=> "admin")
        setEmail(()=> "admin@email.com")
        setPassword(()=> "admin")
      }
      setSignIn((signIn)=> !signIn)
    };
    const onChangeField = (event) => {
      switch(event.target.name){
        case "name":
          setName(()=> event.target.value)
          break;
        case "email":
          setEmail(()=> event.target.value)
          break;
        case "password":
          setPassword(()=> event.target.value)
          break;
        default:
          break;
      }
    }

    const notify = (content, type) => {
      switch(type){
        case "success":
          toast.success(content);
          break;
        case "error":
          toast.error(content);
          break;
        case "info":
          toast.error(content);
          break;
        case "warning":
          toast.warning(content);
          break;
        default:
          toast(content);
          break;
      }
    };

    const onSubmit = async(event) => {
      event.preventDefault();
      try{
        if(event.target.name === "login") {
          if(!email || !password){
            notify("Email and password are required field", "warning");
          } else{
            const response = await axios.post(`${baseUrl}user/login`,{password, email});
            if(response.data.statusCode == "200") {
              notify("Login", "success");
              localStorage.setItem('logintoken', response.data.body.token);
              navaigate("/stories");
            } else{
              notify(response.data.message, "warning");
            }
          }
        } else {
          if(!email || !name || !password) {
            notify("Email name and password are required field", "warning");
          } else{
            const response = await axios.post(`${baseUrl}user`,{password, email, name});
            if(response.data.statusCode == "200" || response.data.statusCode == "201") {
              notify("Signup Success, Go for login", "success");
              setSignIn((signIn)=> !signIn)
            } else{
              notify(response.data.message, "warning");
            }
          }
        }
      }catch(err){
        if(err.name == "AxiosError"){
          notify(err.response.data.message, "error");
        } else {
          notify(err.message, "error");
        }
      }
    }
    

    const userForm = signIn ? <div style={{
      backgroundColor: '#eee',
      width: '400px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 className="text-center">Login</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} onChange={(event)=>onChangeField(event)} placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} onChange={(event)=>onChangeField(event)} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="login" name='login' className="w-100 mt-4" onClick={(event) => onSubmit(event)}>
          LogIn
        </Button>
      </Form>
      Don't have an account? <span style={{color: "blue", cursor: 'pointer'}} onClick={signUpOrSignIn}>Sign Up</span>
    </div>
    : <div style={{
      backgroundColor: '#eee',
      width: '400px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 className="text-center">Sign Up</h3>
      <Form>
      <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" name='name' value={name} onChange={(event)=>onChangeField(event)} placeholder="Enter name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} onChange={(event)=>onChangeField(event)} placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} onChange={(event)=>onChangeField(event)} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="signup" name= "signup" onClick={(event) => onSubmit(event)} className="w-100 mt-4">
          Sign Up
        </Button>
      </Form>
      Already have an account? <span style={{color: "blue", cursor: 'pointer'}} onClick={signUpOrSignIn}>Log In</span>
    </div>;
    return (
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#eee' }}>
      <ToastContainer />
      <Row>
        <Col>
          {userForm}
        </Col>
      </Row>
    </Container>
    );
  }
  
  export default User;