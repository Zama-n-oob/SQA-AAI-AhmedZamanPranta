from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_generate_returns_matching_documents():
    response = client.post("/generate", json={"query": "Data Protection and Privacy Act"})
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert body["status"] == 200
    assert body["message"] == "Search completed successfully"
    assert "summary" in body["data"]
    assert "matched_docs" in body["data"]
    assert len(body["data"]["matched_docs"]) >= 1


def test_generate_rejects_blank_query():
    response = client.post("/generate", json={"query": "   "})
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is False
    assert body["status"] == 400
    assert body["error"] == "Please provide a search query."


def test_generate_returns_no_match_message():
    response = client.post("/generate", json={"query": "nonexistent law 12345"})
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert body["data"]["matched_docs"] == []
    assert body["data"]["summary"] == "No relevant legal documents found."


def test_generate_handles_sqli_like_input_without_crashing():
    response = client.post("/generate", json={"query": "' OR 1=1 --"})
    assert response.status_code == 200

    body = response.json()

    assert body["data"]["summary"] == "No relevant legal documents found."
    assert isinstance(body["data"]["matched_docs"], list)
    assert body["message"] == "Search completed successfully"
    assert body["success"] is True 
    assert body["status"] == 200


def test_generate_handles_xss_like_input_without_reflection():
    payload = "<script>alert('xss')</script>"
    response = client.post("/generate", json={"query": payload})
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert payload not in body["data"]["summary"]


def test_generate_get_endpoint_exists():
    response = client.get("/generate")
    assert response.status_code == 200
    assert response.json() == "hello"


def test_cors_preflight_returns_cors_headers():
    response = client.options(
        "/generate",
        headers={
            "Origin": "http://localhost:3001",
            "Access-Control-Request-Method": "POST",
        },
    )

    assert response.status_code == 200
    # assert response.status_code in (200, 201)
    assert "access-control-allow-origin" in response.headers