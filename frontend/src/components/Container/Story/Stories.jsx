import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { Container, Row, Col, Card, ButtonToolbar, ButtonGroup, Button, Modal} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl = "http://localhost:8080/api/";

function Stories() {
  const navaigate = useNavigate()
  const [stories, setStories] = useState([]);
  const [token, setToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  const [show, setShow] = useState(false);
  const [pagination, setPagination] = useState({page: 1, limit: 5, total: 0, totalPage: 1})
  const [selectedId, setSelectedId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
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
  
  const fetchStories = async (paging) => {
    try{
      const response = await axios.get(`${baseUrl}story?page=${paging.page}&limit=${paging.limit}`);
      if(response.data.statusCode == "200") {
        setStories(response.data.body);
        let page = {page: 1, limit: 1, total: 5, totalPage: 1};
        page.page = response.data.page;
        page.limit = response.data.limit;
        page.totalPage = Math.ceil(response.data.total/response.data.limit);
        page.total = response.data.total;
        setPagination(page);
        // setStories(storiesList);
      }
      else{
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
  const handleDelete = async() => {
    try{
      const response = await axios.delete(`${baseUrl}story/${selectedId}`, {headers:{ Authorization: `Bearer ${token}`}});
      setShow(false)
      if(response.data.statusCode == "200"){
        notify("Deletion successful", "success");
        fetchStories(pagination);
      }
    } catch (err){
      if(err.name == "AxiosError"){
        notify(err.response.data.message, "error");
      } else {
        notify(err.message, "error");
      }
    }
  }

  const onPagination = (e, pageNumber) => {
    e.preventDefault();
    let page = {...pagination};
    page.page = pageNumber;
    setPagination(page);
    fetchStories(page);
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
        } else setUserInformation(decodedToken);
    }
    fetchStories(pagination)
  },[])
    return (
      <Layout>
        <ToastContainer />
        { stories && stories.length>0 ? <Container fluid className="d-flex pt-3" style={{ minHeight: '100vh', backgroundColor: '#eee' }}>
          <Row className="pt-20" style={{justifyContent: "center"}}>
          <Col xs={12} md={10} lg={8} xl={8}>
              {stories.map((story, index) => (
                <Card key={index} style={{ width: '100%', padding: '20px', backgroundColor: '#fff', marginBottom: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                  <Card.Body>
                    <Card.Title className="text-center">{story.title} <span style={{float: 'right', fontSize: "12px", fontStyle: "italic"}}>Watch Time: {(story.engagedTime/1000)+"s"}</span></Card.Title> 
                    <Card.Text>{story.body}</Card.Text>
                    <Button variant="primary" href={`stories/${story.id}`}>read more</Button>{' '}
                    {
                      (userInformation && userInformation.data && (userInformation.data.roleId === "1" || userInformation.data.id === story.authorId)) ? 
                      <>
                        <Button variant="warning" href={`stories/storyform/${story.id}`}>edit</Button>{' '}
                        <Button variant="danger" onClick={()=>handleShow(story.id)}>delete</Button>{' '}
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
                            <Button variant="danger" onClick={()=>handleDelete()}>Confirm</Button>
                          </Modal.Footer>
                        </Modal>
                      </> : null
                    }
                  </Card.Body>
                </Card>
              ))}
              <ButtonToolbar aria-label="Toolbar with button groups" style={{float: "right"}}>
                <ButtonGroup className="me-2" aria-label="First group">
                  {[...Array(pagination.totalPage)].map((v, index)=>{
                    return <Button key={index} disabled={pagination.page == (index + 1)} onClick={(e)=>onPagination(e, index+1)} >{index+1}</Button>
                  })}
                </ButtonGroup>
              </ButtonToolbar>
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