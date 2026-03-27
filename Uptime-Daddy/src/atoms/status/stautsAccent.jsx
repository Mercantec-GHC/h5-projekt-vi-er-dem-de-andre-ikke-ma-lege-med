function statusAccent(code) {
    if (code >= 200 && code < 300) return "green";
    if (code >= 300 && code < 400) return "yellow";
    return "red";
}

export default statusAccent;