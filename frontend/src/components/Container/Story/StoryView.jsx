import Layout from "../../Layout/Layout";
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const StoryView = () => {
  const story = {
    title: "The Enchanted Forest",
    body: "You find yourself at the edge of a mysterious forest.",
    paths: [
      {
        option: "A",
        body: "You decide to enter the forest, where the trees seem to whisper as you pass."
      },
      {
        option: "B",
        body: "You follow a strange sound that leads you deeper into the unknown."
      }
    ],
    engagedTime: 0,
    authorId: "66c7cd0cd96f47ba71bef8bf",
    authorName: "Kumol Bhoumik",
    createdAt: "2024-08-23 06:02:56"
  };

  return (
    <Layout>
    <Container fluid className="d-flex justify-content-center" style={{ height: '100vh', backgroundColor: '#eee' }}>
      <Row>
        <Col>
          <Card style={{ width: '800px', borderTop: "0px", borderRadius: "0px", height: "100vh", padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body>
              <Card.Title className="text-center">{story.title}</Card.Title>
              <Card.Text>{story.body}</Card.Text>
              <h5>Paths:</h5>
              <ul>
                {story.paths.map((path, index) => (
                  <li key={index}><strong>Option {path.option}:</strong> {path.body}</li>
                ))}
              </ul>
              <p><strong>Engaged Time:</strong> {story.engagedTime} seconds</p>
              <p><strong>Author:</strong> {story.authorName}</p>
              <p><strong>Created At:</strong> {story.createdAt}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default StoryView;