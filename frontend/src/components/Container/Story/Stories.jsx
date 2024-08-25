import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const baseUrl = "http://localhost:8080/api/";

function Stories() {
  const [stories, setStories] = useState([]);
  const [token, setToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async(id) => {
    try{
      const response = await axios.delete(`${baseUrl}story/${id}`, {headers:{ Authorization: `Bearer ${token}`}});
      setShow(false)
    } catch (err){
      console.log(err);
    }
  }
  const fetchStories = async () => {
    try{
      const response = await axios.get(`${baseUrl}story`);
      if(response.data.statusCode == "200") {
        console.log(response.data);
        setStories(response.data.body);
      }
    } catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    const userToken = localStorage.getItem('logintoken');
    setToken(()=>userToken);
    if (userToken) {
        const decodedToken = jwtDecode(userToken);
        setUserInformation(decodedToken);
        console.log(decodedToken);
    }
    fetchStories()
  },[])
    return (
      <Layout>
        { stories && stories.length>0 ? <Container fluid className="d-flex align-items-center justify-content-center pt-3" style={{ minHeight: '100vh', backgroundColor: '#eee' }}>
          <Row className="pt-20">
            <Col>
              {stories.map((story, index) => (
                <Card key={index} style={{ width: '800px', padding: '20px', backgroundColor: '#fff', marginBottom: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                  <Card.Body>
                    <Card.Title className="text-center">{story.title}</Card.Title>
                    <Card.Text>{story.body}</Card.Text>
                    <Button variant="primary" href={`stories/${story.id}`}>read more</Button>{' '}
                    {
                      (userInformation && userInformation.data && (userInformation.data.roleId === "1" || userInformation.data.id === story.authorId)) ? 
                      <>
                        <Button variant="warning" href={`stories/storyform/${story.id}`}>edit</Button>{' '}
                        <Button variant="warning" onClick={handleShow}>delete</Button>{' '}
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          {/* <Modal.Header closeButton>
                            <Modal.Title>Are you sure to </Modal.Title>
                          </Modal.Header> */}
                          <Modal.Body>
                            Are you sure to delete ?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="danger" onClick={()=>handleDelete(story.id)}>Confirm</Button>
                          </Modal.Footer>
                        </Modal>
                      </> : null
                    }
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container> : <div style={{
      backgroundColor: '#eee',
      width: '100vw',
      height: '100vh',
      textAlign: "center",
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>Loading....</div>}
      </Layout>
    );
  }
  
  export default Stories;