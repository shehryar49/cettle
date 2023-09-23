from flask import Flask,request,jsonify
import json

app = Flask("cettle")
# Load data
courses = json.loads(open("courses.json").read())
# Callbacks
@app.route("/courses",methods = ["GET"])
def listCourses():
    return jsonify(courses),200

##
app.run()