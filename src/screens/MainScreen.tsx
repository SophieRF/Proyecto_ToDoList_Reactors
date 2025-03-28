import { Container, Row } from "react-bootstrap"
import { NavBar } from "../ui/NavBar/NavBar"
import { Home } from "../ui/Home/Home"
import { SideBar } from "../ui/SideBar/SideBar"

export const MainScreen = () => {
    return (
        <Container>
            <Row>
                <NavBar />
            </Row>
            <Row>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <SideBar />
                    <Home />
                </div>
            </Row>
        </Container>
    )
}
