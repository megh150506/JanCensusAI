import sys
import os
import unittest

# Ensure app path is in sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestJanCensusAPI(unittest.TestCase):
    def test_01_root_endpoint(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("project", data)
        self.assertIn("version", data)

    def test_02_health_endpoint(self):
        response = client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")

    def test_03_get_all_schedules(self):
        response = client.get("/api/v1/schedule/all")
        self.assertEqual(response.status_code, 200)
        schedules = response.json()
        self.assertIsInstance(schedules, list)
        self.assertGreater(len(schedules), 0)

    def test_04_get_state_schedule_valid(self):
        response = client.get("/api/v1/schedule/Maharashtra")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["state_name"], "Maharashtra")

    def test_05_ai_chat_multi_language(self):
        for lang in ["en", "hi", "mr", "ta"]:
            payload = {
                "query": "What is Census 2027?",
                "language": lang
            }
            response = client.post("/api/v1/ai/chat", json=payload)
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIn("answer", data)
            self.assertIn("conversation_id", data)

    def test_06_misinformation_verify(self):
        payload = {
            "claim": "Census enumerators charge 500 Rs fee",
            "language": "mr",
            "claimed_location": "Maharashtra"
        }
        response = client.post("/api/v1/misinformation/verify", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("verdict", data)
        self.assertIn("official_explanation", data)

    def test_07_admin_campaign(self):
        payload = {
            "topic": "Digital Self-Enumeration Portal Drive",
            "target_region": "Maharashtra - Pune",
            "language": "Marathi"
        }
        response = client.post("/api/v1/admin/campaign", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("campaign_id", data)
        self.assertIn("content", data)

    def test_08_admin_analytics(self):
        response = client.get("/api/v1/admin/analytics")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("total_national_target_households", data)

    def test_09_citizen_self_enumeration(self):
        payload = {
            "head_name": "Meghna Agarwal",
            "mobile_number": "9876543210",
            "state": "Maharashtra",
            "district": "Pune",
            "pincode": "411001",
            "house_number": "Flat 402",
            "dwelling_type": "Pucca",
            "total_family_members": 1,
            "preferred_language": "English"
        }
        response = client.post("/api/v1/citizen/self-enumerate", json=payload)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertIn("se_id", data)


if __name__ == "__main__":
    unittest.main()
