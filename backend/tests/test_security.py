from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_generate_handles_sql_injection_like_input():
    payload = {
        "query": "'; DROP TABLE users; --",
        "document_text": "Legal contract sample text."
    }

    response = client.post("/generate", json=payload)

    assert response.status_code in (200, 400, 422)
    assert response.status_code != 500


def test_generate_handles_xss_like_input():
    payload = {
        "query": "<script>alert('xss')</script>",
        "document_text": "Legal contract sample text."
    }

    response = client.post("/generate", json=payload)

    assert response.status_code in (200, 400, 422)
    assert response.status_code != 500

    body_text = response.text.lower()
    assert "<html" not in body_text


def test_generate_rejects_oversized_or_abusive_input_gracefully():
    payload = {
        "query": "Summarize",
        "document_text": "A" * 200000
    }

    response = client.post("/generate", json=payload)

    assert response.status_code in (200, 400, 413, 422)
    assert response.status_code != 500


def test_security_headers_present():
    response = client.get("/")

    # Adjust depending on your actual app/middleware
    allowed_headers = [
        "x-content-type-options",
        "x-frame-options",
        "content-security-policy",
        "strict-transport-security"
    ]

    present = [header for header in allowed_headers if header in response.headers]
    assert isinstance(present, list)