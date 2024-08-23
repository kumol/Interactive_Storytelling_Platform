import Layout from "../../Layout/Layout";
import { Container, Row, Col, Card } from 'react-bootstrap';
function Stories() {
  const stories = [
    {
      id: "story-123",
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
      authorName: "Kumol Bhoumik",
      createdAt: "2024-08-23 06:02:56"
    },
    {
      id: "story-001",
      title: "The Lost City",
      body: "Legends speak of a city hidden deep within the jungle.",
      paths: [
        {
          option: "search_city",
          body: "You begin your search, cutting through dense foliage, hoping to find the lost city."
        },
        {
          option: "return_home",
          body: "Doubting the legend, you decide to return home, leaving the mystery unsolved."
        }
      ],
      engagedTime: 250,
      authorName: "Alice Smith",
      createdAt: "2024-08-20 10:30:00"
    },
    {
      id: "story-002",
      title: "The Haunted Mansion",
      body: "You stand before an old mansion rumored to be haunted.",
      paths: [
        {
          option: "enter_mansion",
          body: "You push open the creaky door and step into the dark, dusty hallway."
        },
        {
          option: "run_away",
          body: "Fear grips you, and you decide to run away, leaving the mansion behind."
        }
      ],
      engagedTime: 180,
      authorName: "Jane Doe",
      createdAt: "2024-08-19 22:15:00"
    },
    {
      id: "story-003",
      title: "The Space Odyssey",
      body: "You are an astronaut aboard a ship heading towards an unexplored galaxy.",
      paths: [
        {
          option: "explore_planet",
          body: "You land on a mysterious planet, eager to explore its surface."
        },
        {
          option: "stay_on_ship",
          body: "You decide to stay on the ship, monitoring the planet from a safe distance."
        }
      ],
      engagedTime: 320,
      authorName: "Mark Johnson",
      createdAt: "2024-08-21 08:00:00"
    },
    {
      id: "story-004",
      title: "The Time Traveler",
      body: "You have discovered a device that allows you to travel through time.",
      paths: [
        {
          option: "go_to_past",
          body: "You set the dial to the past, eager to witness history firsthand."
        },
        {
          option: "go_to_future",
          body: "You set the dial to the future, curious about what lies ahead."
        }
      ],
      engagedTime: 450,
      authorName: "Emily Davis",
      createdAt: "2024-08-18 14:45:00"
    },
    {
      id: "story-005",
      title: "The Dragon's Lair",
      body: "You have found the entrance to the legendary dragon's lair.",
      paths: [
        {
          option: "enter_lair",
          body: "You bravely enter the lair, ready to face the dragon."
        },
        {
          option: "wait_outside",
          body: "You decide to wait outside, gathering your courage before entering."
        }
      ],
      engagedTime: 275,
      authorName: "Robert Brown",
      createdAt: "2024-08-22 17:20:00"
    }
  ];
    return (
      <Layout>
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#eee' }}>
      <Row className="pt-20">
        <Col>
          {stories.map((story, index) => (
            <Card key={index} style={{ width: '800px', padding: '20px', backgroundColor: '#fff', marginBottom: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body>
                <Card.Title className="text-center">{story.title}</Card.Title>
                <Card.Text>{story.body}</Card.Text>
                <h5>Paths:</h5>
                <ul>
                  {story.paths.map((path, pathIndex) => (
                    <li key={pathIndex}><strong>Option {path.option}:</strong> {path.body}</li>
                  ))}
                </ul>
                <p><strong>Engaged Time:</strong> {story.engagedTime} seconds</p>
                <p><strong>Author:</strong> {story.authorName}</p>
                <p><strong>Created At:</strong> {story.createdAt}</p>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
      </Layout>
    );
  }
  
  export default Stories;