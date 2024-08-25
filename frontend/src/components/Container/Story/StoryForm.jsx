import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../Layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = "http://localhost:8080/api/";

const StoryForm = () => {
  const {id} = useParams();
  const navaigate = useNavigate();
  const initialStory = {
    title: "",
    body: "",
    paths: [ ],
    engagedTime: 0
  };
  const [token, setToken] = useState("");
  const [story, setStory] = useState(initialStory);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory({
      ...story,
      [name]: value
    });
  };
  const handlePathChange = (index, e) => {
    const { name, value } = e.target;
    const newPaths = story.paths.map((path, i) => (
      i === index ? { ...path, [name]: value } : path
    ));
    setStory({ ...story, paths: newPaths });
  };

  const addPath = () => {
    setStory({
      ...story,
      paths: [...story.paths, { option: "", body: "" }]
    });
  };

  const removePath = (index) => {
    const newPaths = story.paths.filter((_, i) => i !== index);
    setStory({ ...story, paths: newPaths });
  };

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
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let message = "";
      let response;
      if(id) {
        message = "Update";
        notify(`Requesting ${message}`)
        response = await axios.patch(`${baseUrl}story/${id}`, story, {headers:{ Authorization: `Bearer ${token}`}});
      } else {
        message = "Created";
        notify(`Requesting ${message}`)
        response = await axios.post(`${baseUrl}story`, story, {headers:{ Authorization: `Bearer ${token}`}});
      }
      if(response.data.statusCode == "201" || response.data.statusCode == "200"){
        notify(`${message} successful`, "success")
        navaigate("/stories");
      } 
      if(response.data.statusCode == "304"){
        notify(`Nothing to ${message}`, "warning");
      }
    } catch(err){
      if(err.name == "AxiosError"){
        notify(err.response.data.message, "error");
      } else {
        notify(err.message, "error");
      }
    }
  };

  const fetchStory = async (id) => {
    try{
      const response = await axios.get(`${baseUrl}story/${id}`);
      if(response.data.statusCode == "200") {
        setStory(response.data.body);
      } else {
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

  useEffect(()=>{
    const userToken = localStorage.getItem('logintoken');
    setToken(()=>userToken);
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      if(decodedToken.exp>Date.now()){
        setToken("");
        localStorage.removeItem("logintoken")
        navaigate("/user")
      }
    } else {
      navaigate("/user")
    }
    if(id) fetchStory(id)
  },[]);
  return (
    <Layout>
      <Container fluid className="d-flex align-items-center justify-content-center pt-3" style={{ minHeight: '100vh', backgroundColor: '#eee' }}>
      <ToastContainer />
      <Row style={{height: "100vh"}}>
          <Col>
            <Form style={{ width: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={story.title} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formBody" className="mt-3">
                <Form.Label>Body</Form.Label>
                <Form.Control as="textarea" rows={3} name="body" value={story.body} onChange={handleChange} />
              </Form.Group>

              <h5 className="mt-4">Paths</h5>
              {story.paths.map((path, index) => (
                <div key={index} className="mb-3">
                  <Form.Group controlId={`formPathOption${index}`}>
                    <Form.Label>Option {index + 1}</Form.Label>
                    <Form.Control type="text" name="option" value={path.option} onChange={(e) => handlePathChange(index, e)} />
                  </Form.Group>

                  <Form.Group controlId={`formPathBody${index}`} className="mt-2">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={2} name="body" value={path.body} onChange={(e) => handlePathChange(index, e)} />
                  </Form.Group>

                  <Button variant="danger" className="mt-2" onClick={() => removePath(index)}>Remove Path</Button>
                </div>
              ))}

              <Button variant="secondary" onClick={addPath} className="mt-3">Add Path</Button>

              <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-4 w-100">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default StoryForm;
