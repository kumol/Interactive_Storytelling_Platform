import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function User() {
    const [signIn, setSignIn] = useState(true);
    const signUpOrSignIn = ()=>{
      console.log(signIn)
      setSignIn((signIn)=> !signIn)
    };

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
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Submit
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
          <Form.Control type="name" placeholder="Enter name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Submit
        </Button>
      </Form>
      Already have an account? <span style={{color: "blue", cursor: 'pointer'}} onClick={signUpOrSignIn}>Log In</span>
    </div>;
    return (
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#eee' }}>
      <Row>
        <Col>
          {userForm}
        </Col>
      </Row>
    </Container>
    );
  }
  
  export default User;