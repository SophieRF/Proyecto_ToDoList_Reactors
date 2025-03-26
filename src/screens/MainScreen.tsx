import { Col, Container, Row } from "react-bootstrap"
import { NavBar } from "../ui/NavBar/NavBar"
import { Home } from "../ui/Home/Home"
import { SideBar } from "../ui/SideBar/SideBar"

export const MainScreen = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <NavBar />
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={10}>
                    <Home />
                </Col>
            </Row>
        </Container>
    )
}
