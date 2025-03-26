import { Col, Container, Row } from "react-bootstrap"
import { NavBar } from "../components/NavBar/NavBar"
import { Home } from "../components/Home/Home"
import { SideBar } from "../components/SideBar/SideBar"

export const MainScreen = () => {
    return (
        <Container>
            <Row>
                <Col><NavBar /></Col>
            </Row>
            <Row>
                <Col md={2}><SideBar /></Col>
                <Col md={10}><Home /></Col>
            </Row>
        </Container>
    )
}
