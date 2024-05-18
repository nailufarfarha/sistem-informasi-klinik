import React from "react";
import "../App.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  return (
    <div className="icon-profile">
      <Row>
        <Col xs={3}>
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
        </Col>
        <Col xs={9}>
          <h5>Admin</h5>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
