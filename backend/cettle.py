from flask import Flask,request,jsonify
import json

app = Flask("cettle")

# Load data

courses = json.loads(open("courses.json").read())
venues = json.loads(open("venues.json").read())


# Callbacks

@app.route("/courses")
def listCourses():
    return jsonify(courses),200

@app.route("/venues")
def listVenues():
    return jsonify(venues),200
##
app.run()