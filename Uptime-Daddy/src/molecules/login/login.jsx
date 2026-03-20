import { useState } from "react";
import {
	Grid,
	Segment,
	Form,
	Button,
	Header,
	Divider,
	Image,
	Modal,
	Input,
} from "semantic-ui-react";
import registerImage from "../../assets/loginImage.png";
import logo from "../../assets/logo.png";

function Login() {
	const [resetMode, setResetMode] = useState(false);
	const [resetEmail, setResetEmail] = useState("");

	const sendReset = () => {
		console.log("Password reset requested for", resetEmail);
		setResetMode(false);
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
				<Segment basic style={{ width: "100%", margin: 0 }}>
					<div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
						<Image src={logo} alt="Uptime Daddy Logo" size="medium" centered />
					</div>
					<div>
						<Header
							as="h1"
							textAlign="left"
							style={{ marginBottom: "0.25rem", color: "#6bced3" }}
						>
							Welcome to Uptime Daddy!
						</Header>
					</div>

					<Form style={{ margin: "0 auto" }}>
						<Form.Input label="Email" placeholder="Email" type="email" />
						<Form.Input
							label="Password"
							placeholder="Password"
							type="password"
						/>
						<span
							onClick={() => setResetMode(true)}
							style={{
								color: "#5ac17c",
								textDecoration: "underline",
								cursor: "pointer",
								fontSize: "1rem",
							}}
						>
							Forgot password?
						</span>
						<Button
							type="submit"
							fluid
							primary
							content="Login"
							style={{
								marginTop: "1rem",
								color: "white",
								backgroundColor: "#6bced3",
							}}
						/>
					</Form>

					<div style={{ marginTop: "1rem", textAlign: "left" }}></div>

					<Modal
						onClose={() => setResetMode(false)}
						onOpen={() => setResetMode(true)}
						open={resetMode}
						size="tiny"
					>
						<Modal.Header>Reset your password</Modal.Header>
						<Modal.Content>
							<p>Enter your email and we’ll send reset instructions.</p>
							<Input
								fluid
								placeholder="Email"
								type="email"
								value={resetEmail}
								onChange={(e) => setResetEmail(e.target.value)}
							/>
						</Modal.Content>
						<Modal.Actions>
							<Button onClick={() => setResetMode(false)}>Cancel</Button>
							<Button positive onClick={sendReset} disabled={!resetEmail}>
								Send reset link
							</Button>
						</Modal.Actions>
					</Modal>
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
					style={{
						width: "100%",
						height: "100vh",
						objectFit: "cover",
						display: "block",
					}}
				/>
			</Grid.Column>
		</Grid>
	);
}

export default Login;
