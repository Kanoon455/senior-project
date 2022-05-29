import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Blank from "./pages/blank";
import SignIn from "./components/signIn";


function App() {
  return (
    <div className="app">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Admin</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="/signIn">
                SignUp/LogIn
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/blank" element={<Blank />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
//  <Nav.Link href="#deets">Register</Nav.Link>
