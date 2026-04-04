import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_generate_success():
    payload = {
        "query": "Summarize this clause",
        "document_text": "This agreement is valid for one year."
    }

    response = client.post("/generate", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data is not None
    assert isinstance(data, dict)


def test_generate_missing_query():
    payload = {
        "document_text": "This agreement is valid for one year."
    }

    response = client.post("/generate", json=payload)

    assert response.status_code in (400, 422)


def test_generate_missing_document_text():
    payload = {
        "query": "Summarize this clause"
    }

    response = client.post("/generate", json=payload)

    assert response.status_code in (400, 422)


def test_generate_empty_payload():
    response = client.post("/generate", json={})

    assert response.status_code in (400, 422)


def test_generate_invalid_content_type():
    response = client.post(
        "/generate",
        data="not-json",
        headers={"Content-Type": "text/plain"}
    )

    assert response.status_code in (400, 415, 422)