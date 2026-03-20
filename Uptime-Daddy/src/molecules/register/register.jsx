import { Grid, Segment, Form, Button, Header, Divider, Image } from "semantic-ui-react";
import registerImage from "../../assets/loginImage.png";
import logo from "../../assets/logo.png"; 

function Register() {
  return (
    <Grid
      columns={2}
      stackable={false}
      style={{ minHeight: "100vh", margin: 0 }}
      verticalAlign="middle"
    >
      <Grid.Column
        style={{
          width: "50%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Segment basic style={{ width: "100%", margin: 0,  }}>
          <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
            <Image src={logo} alt="Uptime Daddy Logo" size="medium" centered />
          </div>

          <Header as="h1" textAlign="left" style={{ marginBottom: "0.25rem", color: "#6bced3" }}>
			Welcome to Uptime Daddy!
          </Header>
          <p style={{ marginBottom: "1rem", color: "black" }}>
            Create your account and start monitoring your sites instantly.
          </p>

          <Divider horizontal>or create with email</Divider>

          <Form style={{ margin: "0 auto" }}>
            <Form.Input label="Full Name" placeholder="Full Name" />
            <Form.Input label="Email" placeholder="Email" type="email" />
            <Form.Input label="Password" placeholder="Password" type="password" />
            <Button type="submit" fluid primary content="Create account" style={{ marginTop: "1rem", color: "white", backgroundColor: "#6bced3" }} />
          </Form>
        </Segment>
      </Grid.Column>

      <Grid.Column
        style={{
          width: "50%",
          minHeight: "100vh",
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={registerImage}
          alt="Welcome"
          style={{ width: "100%", height: "100vh", objectFit: "cover", display: "block" }}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Register;