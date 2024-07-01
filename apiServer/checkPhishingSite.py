from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/checkPhishingSite', methods=['POST'])
def check_phishing_site():
    data = request.get_json()
    link_url = data.get('link')
    
    # Placeholder for actual phishing check logic
    # Example response
    phishing_score = 9
    service_name = "PhishingDetector"
    reason = "Suspicious URL pattern"

    result = {
        "phishingScore": phishing_score,
        "serviceName": service_name,
        "reason": reason
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
