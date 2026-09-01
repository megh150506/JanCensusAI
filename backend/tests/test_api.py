import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "project" in data
    assert "version" in data
    assert data["environment"] is not None

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "service" in data

def test_get_all_schedules():
    response = client.get("/api/v1/schedule/all")
    assert response.status_code == 200
    schedules = response.json()
    assert isinstance(schedules, list)
    assert len(schedules) > 0
    state_names = [s["state_name"] for s in schedules]
    assert "Maharashtra" in state_names

def test_get_state_schedule_valid():
    response = client.get("/api/v1/schedule/Maharashtra")
    assert response.status_code == 200
    data = response.json()
    assert data["state_name"] == "Maharashtra"
    assert "phase1_houselisting_window" in data
    assert len(data["districts"]) > 0

def test_get_state_schedule_invalid():
    response = client.get("/api/v1/schedule/NonExistentState")
    assert response.status_code == 404

def test_ai_chat_english():
    payload = {
        "query": "What is the difference between Phase 1 and Phase 2?",
        "language": "en"
    }
    response = client.post("/api/v1/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert len(data["answer"]) > 10
    assert "conversation_id" in data

def test_ai_chat_hindi():
    payload = {
        "query": "चरण 1 और चरण 2 में क्या अंतर है?",
        "language": "hi"
    }
    response = client.post("/api/v1/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data

def test_ai_chat_marathi():
    payload = {
        "query": "टप्पा 1 आणि टप्पा 2 मध्ये काय फरक आहे?",
        "language": "mr"
    }
    response = client.post("/api/v1/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data

def test_misinformation_verify_fee_claim():
    payload = {
        "claim": "Enumerators are charging 500 Rupees processing fee for census form",
        "language": "en",
        "claimed_location": "Maharashtra"
    }
    response = client.post("/api/v1/misinformation/verify", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["verdict"] in ["FACT", "MISINFORMATION", "PARTIALLY_ACCURATE"]
    assert "official_explanation" in data

def test_admin_campaign_generation():
    payload = {
        "topic": "Awareness drive for Self-Enumeration portal",
        "target_region": "Maharashtra - Pune District",
        "language": "English & Marathi"
    }
    response = client.post("/api/v1/admin/campaign", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "campaign_id" in data
    assert "content" in data
    assert "sms" in data["content"]

def test_admin_analytics():
    response = client.get("/api/v1/admin/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "total_national_target_households" in data
    assert "regions_breakdown" in data

def test_citizen_self_enumeration():
    payload = {
        "head_name": "Aarav Patel",
        "mobile_number": "9876543210",
        "email": "aarav.patel@example.com",
        "state": "Maharashtra",
        "district": "Pune",
        "sub_district": "Haveli",
        "town_village": "Pune",
        "pincode": "411001",
        "house_number": "Flat 101, Green Valley",
        "dwelling_type": "Pucca / Permanent Building",
        "total_family_members": 2,
        "members": [
          {
            "full_name": "Neha Patel",
            "relationship_to_head": "Spouse",
            "gender": "Female",
            "age": 30
          }
        ],
        "preferred_language": "Marathi"
    }
    response = client.post("/api/v1/citizen/self-enumerate", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True

    assert "se_id" in data
    assert "qr_code_link" in data
