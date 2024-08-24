import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  const [token, setToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  
  useEffect(()=>{
    const userToken = localStorage.getItem('logintoken');
    setToken(()=>userToken);
    if (userToken) {
        const decodedToken = jwtDecode(userToken);
        setUserInformation(decodedToken);
    }
  },[])
  return (
    <Navbar className="mb-10">
      <Container>
        <Navbar.Brand > <Nav.Link href="/stories">Story Telling Platform</Nav.Link> </Navbar.Brand>
        <Navbar.Toggle />
        {token ? <Nav.Link href="/stories/storyform">New Story</Nav.Link> : null}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {token ? <Navbar.Text>
            Signed in as: <a href="" onClick={()=>{localStorage.removeItem('logintoken')}}>{userInformation.data.name}</a>
          </Navbar.Text>
          : <Navbar.Text>
            <a href="/user">Signup/Login</a>
          </Navbar.Text>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;