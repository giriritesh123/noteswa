import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landingp.css";

function Landingpage() {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Ur-Notes</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button type="button" size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  type="button"
                  variant="outline-success"
                  size="lg"
                  className="landingbutton lbtwobg"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Landingpage;
