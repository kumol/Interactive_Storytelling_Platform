import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../Layout/Layout';

const StoryForm = () => {
  const initialStory = {
    title: "The Haunted Mansion",
    body: "You stand before an old mansion rumored to be haunted.",
    paths: [
      {
        option: "A",
        body: "You push open the creaky door and step into the dark, dusty hallway."
      },
      {
        option: "B",
        body: "Fear grips you, and you decide to run away, leaving the mansion behind."
      },
      {
        option: "C",
        body: "Fear grips you, and you decide to run away, leaving the mansion behind."
      },
      {
        option: "D",
        body: "Fear grips you, and you decide to run away, leaving the mansion behind."
      }
    ]
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Story:", story);
  };

  return (
    <Layout>
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#eee' }}>
      <Row>
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

            <Button variant="primary" type="submit" className="mt-4 w-100">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default StoryForm;
