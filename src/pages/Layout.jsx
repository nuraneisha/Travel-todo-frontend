import { Navbar, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCountdown } from "../components/Countdown";
import { getUpcomingTrip } from "../components/UpcomingTrip";
import { useNavigate, Outlet } from "react-router-dom";
import { logout } from "../features/todos/authSlice";


function Layout() {
    const trips = useSelector((state) => state.trips);
    const safeTrips = trips || [];
    const upcomingTrip = getUpcomingTrip(safeTrips);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <Row style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <Col sm={1} className="d-flex flex-column justify-content-center align-items-center bg-light">
                    <Button variant="light" onClick={() => navigate("/dashboard/listTrip")}>
                        <i className="bi bi-airplane" style={{ fontSize: "35px" }}></i>
                        <span> Trips</span>
                    </Button>
                    <Button variant="light" onClick={() => navigate("/dashboard/listTodo")}>
                        <i className="bi bi-list-ol" style={{ fontSize: "35px" }}></i>
                        <span> Task</span>
                    </Button>
                </Col>
                <Col md={11} className="m-0 p-0">
                    <Navbar bg="light" variant="light" className="mx-0">
                        <Container fluid>
                            <Navbar.Brand onClick={() => navigate("/dashboard")} style={{ cursor: "pointer", fontSize: "25px", fontWeight: "1000" }}>
                                🌎 WanderList - {upcomingTrip?.trip} (
                                {upcomingTrip ? getCountdown(upcomingTrip.date) : "No trip set"})
                            </Navbar.Brand>
                            <Button className="me-2" variant="outline-danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Container>
                    </Navbar>
                    <Outlet />
                </Col >
            </Row>
        </>
    );
}

export default Layout;
