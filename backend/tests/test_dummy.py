from django.test import TestCase, RequestFactory

from backend import test_views

class ExampleViewTest(TestCase):
	longMessage = True

	def test_test(self):
		status_code = 200

		req = RequestFactory().get('/test/')
		resp = test_views.index(req, *[], **{})
		self.assertEqual(resp.content, b'{"status": "I\'m here"}')
		self.assertEqual(resp.status_code, 200)