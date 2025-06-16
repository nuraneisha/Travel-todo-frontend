import { Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Image
                src="https://media.cntraveller.com/photos/642aa1ae770beda2d4f5cc24/master/w_1600%2Cc_limit/Fiji-march2023issue-JackJohns17.jpg"
                alt="Fiji Island"
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
            <h1 className="my-4">🌴 Welcome to WanderList 🌍</h1>
            <Button variant="primary" size="lg" onClick={() => navigate("/login")}>
                Get Started
            </Button>
        </Container>
    );
}