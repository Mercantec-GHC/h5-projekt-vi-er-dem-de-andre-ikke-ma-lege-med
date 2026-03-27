import { Menu, Container, Button, Image } from "semantic-ui-react";
import logo from "../../assets/logo.png";

function Settings() {

    return (
        <Menu fixed="top" className="app-Settings">
            <Container>
                <Menu.Item header style={{ display: "flex", alignItems: "center", fontSize: "1.75rem", fontWeight: "bold"}}>
                    <Image src={logo} alt="Uptime Daddy Logo" style={{ marginRight: "0.25rem", height: '60px', width: 'auto' }} />
                    <span style={{color: '#B0E4CC'}}>Uptime</span><span style={{ marginLeft: "0.5rem", color:"" }}>Daddy</span>
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

export default Settings;