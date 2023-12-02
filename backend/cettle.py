from flask import Flask,request,jsonify
import json

app = Flask("cettle")
courses = None
venues = None
inst = None
sections = None
timetable = None
# Load data
def loadData():
    global courses
    global venues
    global inst
    global sections
    global timetable
    courses = json.loads(open("courses.json").read())
    venues = json.loads(open("venues.json").read())
    inst = json.loads(open("inst.json").read())
    sections = json.loads(open("sections.json").read())
    timetable = json.loads(open("timetable.json").read())
    
def rewrite(dict_obj,fname):
    f = open(fname,"w")
    strJSON = json.dumps(dict_obj,indent=4)
    f.write(strJSON)
    f.close()
def searchObj(attr,val,objlist):
    for i in range(len(objlist)):
        if(objlist[i][attr] == val):
          return i
    return None
# Callbacks

# courses
@app.route("/courses",methods=["GET"])
def listCourses():
    return jsonify(courses),200
@app.route("/courses",methods=["POST"])
def addCourse():
    course = request.json
    idx = searchObj("id",course["id"],courses["courses"])
    if idx != None:
      return jsonify({'msg': 'A course exists with same id!'}),409
    courses["courses"].append(course)
    rewrite(courses,"courses.json")
    return jsonify({'msg': 'Course added!'}),200
@app.route("/courses/<id>",methods=["DELETE"])
def deleteCourse(id):
    idx = searchObj("id",id,courses["courses"])
    if idx != None:
      del courses["courses"][idx]
      rewrite(courses,"courses.json")
      return jsonify(courses),200
    return jsonify({'msg': 'Course not found!'}),404
# not implementing update course
# delete and create again


# venues
@app.route("/venues",methods=["GET"])
def listVenues():
    return jsonify(venues),200

@app.route("/venues",methods=["POST"])
def addVenue():
    venue = request.json
    idx = searchObj("id",venue["id"],venues["venues"])
    if idx!=None:
      return jsonify({'msg': 'A venue with same id already exists!'}),409
    venues["venues"].append(venue)
    rewrite(venues,"venues.json")
    return jsonify({'msg': 'Venue added!'}),200
@app.route("/venues/<id>",methods=["DELETE"])
def deleteVenue(id):
    idx = searchObj("id",id,venues["venues"])
    if idx!=None:
      del venues["venues"][idx]
      rewrite(venues,"venues.json")
      return jsonify(venues),200
    return jsonify({'msg': 'Venue not found!'}),404

# not implementing update venue
# delete and create again

# instructors
@app.route("/inst",methods=["GET"])
def listInst():
    return jsonify(inst),200

@app.route("/inst",methods=["POST"])
def addInst():
    newInst = request.json
    idx = searchObj("id",newInst["id"],inst["inst"])
    if idx!=None:
      return jsonify({'msg': 'A teacher with same id already exists!'}),409
    inst["inst"].append(newInst)
    rewrite(inst,"inst.json")
    return jsonify({'msg': 'Instructor added!'}),200
@app.route("/inst/<id>",methods=["DELETE"])
def deleteInst(id):
    idx = searchObj("id",id,inst["inst"])
    if idx!=None:
      del inst["inst"][idx]
      rewrite(inst,"inst.json")
      return jsonify(inst),200
    return jsonify({'msg': 'Instructor not found!'}),404
# not implementing update venue
# delete and create again

# sections
@app.route("/sections",methods=["GET"])
def listSections():
    return jsonify(sections),200

@app.route("/sections",methods=["POST"])
def addSection():
    newSection = request.json
    idx = None
    secList = sections["sections"]
    for i in range(len(secList)):
        print(secList[i]["courseID"])
        if secList[i]["name"] == newSection["name"] and secList[i]["courseID"] == newSection["courseID"]:
            idx = i
            break
    if idx!=None:
      return jsonify({'msg': 'Section of same course already exists!'}),409
    sections["sections"].append(newSection)
    rewrite(sections,"sections.json")
    return jsonify({'msg': 'Section added!'}),200
@app.route("/sections/<name>/<cid>",methods=["DELETE"])
def deleteSection(name,cid):
    idx = None
    secList = sections["sections"]
    for i in range(len(secList)):
        if secList[i]["name"] == name and secList[i]["courseID"] == cid:
            idx = i
            break
    if idx!=None:
      del sections["sections"][idx]
      rewrite(sections,"sections.json")
      return jsonify({}),200
    return jsonify({'msg': 'Section not found!'}),404
# Timetable
@app.route("/timetable",methods=["GET"])
def getTimetable():
  return jsonify(timetable),200
##
loadData()
app.run()
