import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = "http://localhost:8080/api/";

const StoryView = () => {
  const [token, setToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [viewPath, setViewPath] = useState({});
  const [story, setStory] = useState({});
  const [startingTime, setStartingTime] = useState(Date.now());
  const {id} = useParams();
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
  const fetchStory = async (id) => {
    try{
      const response = await axios.get(`${baseUrl}story/${id}`);
      if(response.data.statusCode == "200") {
        setStory(response.data.body);
      } else{
        notify(response.data.message, "warning");
      }
    } catch(err){
      if(err.name == "AxiosError"){
        notify(err.response.data.message, "error");
      } else {
        notify(err.message, "error");
      }
    }
  }

  const chooseOption = (id)=>{
    setSelectedOption(id);
    let pathIndex = story.paths.findIndex(p=> p.option === id);
    setViewPath(story.paths[pathIndex]);
  }

  const updateEngagedTime = async (time)=>{
    try{
      const response = await axios.put(`${baseUrl}story/${id}`, {engagedTime: time}, {headers:{ Authorization: `Bearer ${token}`}});
    } catch(err){
      if(err.name == "AxiosError"){
        notify(err.response.data.message, "error");
      } else {
        notify(err.message, "error");
      }
    }
  }
  useEffect(()=>{
    setStartingTime(Date.now());
    const userToken = localStorage.getItem('logintoken');
    setToken(()=>userToken);
    if (userToken) {
        const decodedToken = jwtDecode(userToken);
        setUserInformation(decodedToken);
    }
    fetchStory(id);
    let endingTime = Date.now();
    // updateEngagedTime(endingTime-startingTime)
    
  }, [])

  useEffect(()=>{
    return () => {
      let endingTime = Date.now();
      notify("Updating engagetime", "success");
      updateEngagedTime(endingTime-startingTime)
    }
  }, [story, viewPath])

  return (
    <Layout>
      
      {
        story && story.paths ? <Container fluid className="d-flex justify-content-center pt-3" style={{ height: '100vh', backgroundColor: '#eee' }}>
        <ToastContainer />
        <Row>
        
          <Col>
            <Card style={{ width: '800px', borderTop: "0px",  backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body>
                <Card.Title className="text-center">{story.title} <span style={{float: 'right'}}>{(story.engagedTime/1000)+"s"}</span></Card.Title>
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