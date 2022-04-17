from flask import Flask, request, jsonify
from model import diseasePredictionModel
app = Flask(__name__)

prediction = diseasePredictionModel()

@app.route('/')
def hello_world():
    return 'Hello World'



@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if (request.method=='POST'):
        symptoms = request.form['symptoms']
        result = prediction(symptoms)
        return jsonify(result)

if (__name__=='__main__'):
    app.run(debug=True, port=3002)