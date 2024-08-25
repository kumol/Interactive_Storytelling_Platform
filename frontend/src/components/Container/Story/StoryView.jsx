import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
const baseUrl = "http://localhost:8080/api/";

const StoryView = () => {
  const [token, setToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [viewPath, setViewPath] = useState({});
  const [story, setStory] = useState({});
  const {id} = useParams();
  const fetchStory = async (id) => {
    try{
      const response = await axios.get(`${baseUrl}story/${id}`);
      if(response.data.statusCode == "200") {
        setStory(response.data.body);
      }
    } catch(err){
      console.log(err);
    }
  }

  const chooseOption = (id)=>{
    setSelectedOption(id);
    let pathIndex = story.paths.findIndex(p=> p.option === id);
    setViewPath(story.paths[pathIndex]);
    console.log(story.paths[pathIndex]);
  }

  useEffect(()=>{
    
    const userToken = localStorage.getItem('logintoken');
    setToken(()=>userToken);
    if (userToken) {
        const decodedToken = jwtDecode(userToken);
        setUserInformation(decodedToken);
        console.log(decodedToken);
    }
    fetchStory(id)
  },[])

  return (
    <Layout>
      {
        story && story.paths ? <Container fluid className="d-flex justify-content-center pt-3" style={{ height: '100vh', backgroundColor: '#eee' }}>
        <Row>
          <Col>
            <Card style={{ width: '800px', borderTop: "0px", borderRadius: "0px", height: "100vh", padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body>
                <Card.Title className="text-center">{story.title}</Card.Title>
                <Card.Text>{story.body}</Card.Text>
                {
                  viewPath ? <Card.Text>{viewPath.body}</Card.Text> : null
                }
                <p>Choose options</p>

                {story.paths.map((path, index)=>{
                  return <Button key={index} variant="secondary" onClick={()=>chooseOption(path.option)} style={{marginRight: "20px"}}>{path.option}</Button>
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> 
      :<div style={{
        backgroundColor: '#eee',
        width: '100vw',
        height: '100vh',
        textAlign: "center",
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>Loading....</div>
      }
    </Layout>
  );
};

export default StoryView;