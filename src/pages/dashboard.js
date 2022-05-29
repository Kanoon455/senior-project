import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import firebaseApp from "../database/firebase";

const App = props => {

  const db = firebaseApp.firestore()
  const userCollection = db.collection('users')

  // const insert = props => {
    const [nameSenser, setNameSenser] = useState('');
    const [typeSenser, setTypeSenser] = useState('');
    const [dateSenser, setDateSenser] = useState('');
    const [latitudeSenser, setLatitudeSenser] = useState('');
    const [longtitudeSenser, setLongtitudeSenser] = useState('');
//  }



  async function insertDocument() {
    const documentRef = await userCollection.add({
      nameSenser,
      typeSenser,
      dateSenser,
      latitudeSenser,
      longtitudeSenser
    })
    alert(`new document has been inserted as ${documentRef.id}`)
  }

  // const delateData
  // const addData
  // const updateData

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
                onChange={e =>  setNameSenser(e.target.value)} />
              <br />
              <Form.Control
                placeholder="Type of Senser"
                value={typeSenser}
                onChange={e => setTypeSenser(e.target.value)} />
              <br />
              <Form.Control placeholder="Date"
                value={dateSenser}
                onChange={e => setDateSenser(e.target.value)} />
            </Col>

            <Col>
              <Form.Control placeholder="Latitude"
                value={latitudeSenser}
                onChange={e => setLatitudeSenser(e.target.value)} />
              <br />
              <Form.Control placeholder="Longtitude"
                value={longtitudeSenser}
                onChange={e => setLongtitudeSenser(e.target.value)} />
              <br />
              <div className="d-grid gap-2">
                <Button variant="success" size="md" onClick={insertDocument}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>

        <table className="table">
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
        </table>
      </div>
    </div>
  );
}

export default App;
