import { Button, Container, Header, Input } from "semantic-ui-react";

function SearchWebsite() {
    return (
        <Container style={{ backgroundColor: "#091413", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <Header as="h2" style={{ color: "#B0E4CC", margin: 0, fontSize: '2rem' }}>Search Website</Header>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Input iconPosition="left" className="main-search-input" icon='search' placeholder='Search...' />
                    <Button>Search</Button>
                </div>
            </div>
            <p style={{color: "#408A71"}}>Input your website here to add it to your list on montired webistes</p>
        </Container>
    );
}

export default SearchWebsite;