import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/todos/authSlice";
import { Button, Form, Container, Alert, Card } from "react-bootstrap";
import { useState } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "user" && password === "password") {
            dispatch(login());
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card style={{ backgroundColor: "lightblue", width: "100%", maxWidth: "400px" }} className="p-4 shadow">
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <strong><h3>🛫 WanderList Login</h3></strong>
                    </Card.Title>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="w-100">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}