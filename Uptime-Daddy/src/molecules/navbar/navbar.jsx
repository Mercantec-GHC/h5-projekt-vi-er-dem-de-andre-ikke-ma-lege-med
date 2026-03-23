import "./style.css";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <Menu fixed="top" className="app-navbar">
            <Container>
                <Menu.Item header style={{ display: "flex", alignItems: "center", fontSize: "1.5rem", fontWeight: "bold"}}>
                    <Image src={logo} alt="Uptime Daddy Logo" size="mini" style={{ marginRight: "0.25rem", height: '50px', width: 'auto' }} />
                    Uptime Daddy
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button compact>Dashboard</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button compact>Settings</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button compact negative onClick={handleLogout}>Logout</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}

export default Navbar;