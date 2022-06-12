import React, {
  useEffect,
  useState
} from "react";
import { Col, Row, Form, Button, Table, Container, Modal, FormGroup, Stack } from "react-bootstrap";
import firebase from "../database/firebase";
import { doc, onSnapshot } from "firebase/firestore"

const App = props => {

  ///////////////////////////////////// imprement state /////////////////////////////////

  const [nameSenser, setNameSenser] = useState('');
  const [typeSenser, setTypeSenser] = useState('');
  const [dateSenser, setDateSenser] = useState('');
  const [latitudeSenser, setLatitudeSenser] = useState('');
  const [longtitudeSenser, setLongtitudeSenser] = useState('');

  const [updateName, setUpdateName] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [updateLati, setUpdateLati] = useState('');
  const [updateLong, setUpdateLong] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const db = firebase.firestore();

  //////////////////////////////////// add data state /////////////////////////////////

  async function insertDocument() {
    
    const documentRef = await db.collection("sensor").add({
      nameSenser,
      typeSenser,
      dateSenser,
      latitudeSenser,
      longtitudeSenser
    })
    console.log(db);
    alert(`new document has been inserted as ${documentRef.id}`)
  }

  ///////////////////////////////// fetch data state ///////////////////////////////////

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("sensor")
      .onSnapshot((queryResponses) => {
        queryResponses.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(),
            key: doc.id,
          })
        });
        setPost(getPostsFromFirebase);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return (<h1>loading ...</h1>)
  }

  //////////////////////////////////// update state ////////////////////////////////

  const handleChange = (e) => {
    e.preventDefault();
  }

  async function updateDocument(id) {
    console.log(id)
    const documentRef = await db.collection("sensor").doc(id).update({
      updateName,
      updateType,
      updateDate,
      updateLati,
      updateLong
    });
    console.log(documentRef);
  }

  /////////////////////////////////////// delete process ///////////////////////////
  async function deleteDocument(id) {
    db.collection("sensor").doc(id).delete();
    console.log("deleted " + id)
  }

  return (
    <div className="dashboard">
      <div className="container fluid=md">
        <br />
        <Row>
          <Col md={4}>
            <h2>Welcome to Dashboard</h2>
          </Col>
        </Row>
        <br />
        <Form>
          <Row>
            <Col>
              <Form.Control
                placeholder="Name of Senser"
                value={nameSenser}
                onChange={e => setNameSenser(e.target.value)} />
              <br />
              <Form.Control
                placeholder="Type of Senser"
                value={typeSenser}
                onChange={e => setTypeSenser(e.target.value)} />
              <br />
              <Form.Control
                placeholder="Date"
                value={dateSenser}
                onChange={e => setDateSenser(e.target.value)} />
            </Col>

            <Col>
              <Form.Control
                placeholder="Latitude"
                value={latitudeSenser}
                onChange={e => setLatitudeSenser(e.target.value)} />
              <br />
              <Form.Control
                placeholder="Longtitude"
                value={longtitudeSenser}
                onChange={e => setLongtitudeSenser(e.target.value)} />
              <br />
              <div className="d-grid gap-2">
                <Button variant="success" size="md" onClick={insertDocument}>Submit</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <Container>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Latitude</th>
                  <th>Longtitude</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {post.length > 0 ? (
                  post.map((post) =>
                    <tr key={post.key}>
                      <td>{post.nameSenser}</td>
                      <td>{post.typeSenser}</td>
                      <td>{post.dateSenser}</td>
                      <td>{post.latitudeSenser}</td>
                      <td>{post.longtitudeSenser}</td>
                      <td>
                        <Button variant="outline-primary" onClick={handleShow} size="sm">
                          edit
                        </Button>
                        {' '}
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Enter in text</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group className="mb-3"
                                value={post.updateName}
                                onChange={e => setUpdateName(e.target.value)}>
                                <Form.Label>Name sensor</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="NP-234"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3"
                                value={post.updateType}
                                onChange={e => setUpdateType(e.target.value)}>
                                <Form.Label>Type sensor</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="CO2"

                                />
                              </Form.Group>
                              <Form.Group className="mb-3"
                                value={post.updateDate}
                                onChange={e => setUpdateDate(e.target.value)}>
                                <Form.Label>Date update</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="22-4-2022"

                                />
                              </Form.Group>
                              <Form.Group className="mb-3"
                                value={post.updateLati}
                                onChange={e => setUpdateLati(e.target.value)}>
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="16.234"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3"
                                value={post.updateLong}
                                onChange={e => setUpdateLong(e.target.value)} />
                              <Form.Label>Longtitude</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="13.4564"
                                />
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={updateDocument(post.key)}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteDocument(post.key)} >
                        Delete
                      </Button>

                    </td>
                    </tr>)
              ) : <h1>no post.</h1>}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
    </div >
  );
}

export default App;


/* <table className="table">
<caption>Data about realtime.</caption>
<thead>
  <tr>
    <th scope="col">Name of Senser</th>
    <th scope="col">Type Senser</th>
    <th scope="col">Latitude</th>
    <th scope="col">Longtitude</th>
    <th scope="col">Date</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>LP-255</td>
    <td>"Pm2.5"</td>
    <td>100.893</td>
    <td>10.65</td>
    <td>22-03-2022</td>
  </tr>
  <tr>
    <td>NT-355</td>
    <td>"CO2"</td>
    <td>39.33</td>
    <td>56.495</td>
    <td>19-03-2022</td>
  </tr>
  <tr>
    <td>NK-056</td>
    <td>"CO"</td>
    <td>20.956</td>
    <td>99.369</td>
    <td>20-04-2016</td>
  </tr>
  <tr>
    <td>BK-123</td>
    <td>"PM2.5"</td>
    <td>23.786</td>
    <td>91.612</td>
    <td>10-09-2020</td>
  </tr>
</tbody>
</table> */

// const [userData, setUserData] = useState([]);


// useEffect(() => {
//   const firestore = userCollection;
//   firestore.on("value", (Response) => {
//     const data = Response.val();
//     let userInfo = [];
//     for(let id in data){
//       userInfo({
//         id :id,
//         nameSenser: data[id].nameSenser,
//         typeSenser: data[id].typeSenser,
//         dateSenser: data[id].dateSenser,
//         latitudeSenser: data[id].latitudeSenser,
//         longtitudeSenser: data[id].longtitudeSenser,
//       });
//     }
//     setUserData(userInfo)
//   });
// })

// userCollection.onSnapshot((querySnapshot) => {
//   var user = [];
//   querySnapshot.forEach(doc => {
//     user.push(doc.data());
//   });
//   // console.log(querySnapshot);
//   console.log(user);
// });
{/* <div className="contrainer">
                  {
                    post.length > 0 ? (
                      post.map((post) => <div key={post.key}>{post.nameSenser}</div>)
                    ) : <h1>no post.</h1>
                  }
                </div> */}