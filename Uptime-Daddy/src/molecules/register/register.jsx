import { useState } from "react";
import { Grid, Segment, Form, Button, Header, Divider, Image, Message } from "semantic-ui-react";
import registerImage from "../../assets/loginImage.png";
import logo from "../../assets/logo.png"; 

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = {
        fullName,
        email,
        password,
      }; 


      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSuccessMessage("Account data sent successfully.");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMessage("Network error. Check that the API is running on port 6969.");
      } else {
        setErrorMessage(error.message || "Failed to send account data.");
      }
    } finally {
      setLoading(false);
      setFullName("");
      setEmail("");
      setPassword("");
    }
  };

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

          <Form style={{ margin: "0 auto" }} onSubmit={handleSubmit}>
            <Form.Input
              label="Full Name"
              placeholder="Full Name"
              value={fullName}
              onChange={(_, data) => setFullName(data.value)}
              required
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(_, data) => setEmail(data.value)}
              required
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(_, data) => setPassword(data.value)}
              required
            />
            {errorMessage && <Message negative content={errorMessage} />}
            {successMessage && <Message positive content={successMessage} />}
            <Button
              type="submit"
              fluid
              primary
              loading={loading}
              disabled={loading}
              content="Create account"
              style={{ marginTop: "1rem", color: "white", backgroundColor: "#6bced3" }}
            />
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