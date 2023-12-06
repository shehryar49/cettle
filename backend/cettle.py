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
def searchSection(name,cid):
    idx = None
    for i in range(len(sections["sections"])):
      if sections["sections"][i]["name"] == name and sections["sections"][i]["courseID"] == cid:
        return i
    return idx
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
    idx1 = searchObj("courseID",id,sections["sections"])
    if idx1!=None:
      return jsonify({'msg': 'The course has sections associated with it it. Cannot delete it'}),409
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

# not implementing update
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
    idx1 = searchObj("instID",id,sections["sections"])
    if idx1!=None:
      return jsonify({'msg': 'Cannot delete instructor. The instructor teaches section '+sections["sections"][idx1]["name"]}),409
    idx = searchObj("id",id,inst["inst"])
    if idx!=None:
      del inst["inst"][idx]
      rewrite(inst,"inst.json")
      return jsonify(inst),200
    return jsonify({'msg': 'Instructor not found!'}),404

# not implementing update 
# delete and create again
@app.route("/inst/addpref",methods=["POST"])
def addInstPref():
  obj = request.json
  id = obj["id"] # instructor id
  idx = searchObj("id",id,inst["inst"])
  if idx == None:
    return jsonify({'msg': 'Teacher not found!'}),404
  inst["inst"][idx]["slots"] = [obj["start"],obj["end"]]
  rewrite(inst,"inst.json")
  return jsonify({'msg': 'Success'}),200
# sections
@app.route("/sections",methods=["GET"])
def listSections():
    return jsonify(sections),200
@app.route("/sections/<dept>",methods=["GET"])
def getDeptSections(dept):
    req = []
    for i in range(len(sections["sections"])):
      sec = sections["sections"][i]
      if sec["dept"] == dept:
        cid = sec["courseID"]
        idx = None
        for j in range(len(courses["courses"])):
          if courses["courses"][j]["id"] == cid:
            idx = j
            break
        if idx == None:
          req.append({"name": sec["name"],"courseID": cid,"courseName": None,"instID": sec["instID"]})
        else:
          req.append({"name": sec["name"],"courseID": cid,"courseName": courses["courses"][idx]["name"],"instID": sec["instID"]})
    req = {"sections": req}
    return jsonify(req),200        
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
@app.route("/timetable/clear",methods=["POST"])
def clearSlot():
  obj = request.json
  SL = timetable[obj["day"]][int(obj["slot"])-1]
  for i in range(len(SL)):
    print(SL[i]["courseName"])
    if SL[i]["venue"] == obj["venue"]:
      if SL[i]["dept"] != obj["dept"]:
        return jsonify({'msg': 'The slot is occupied by a course of another department. Switch to that department to clear it!'}),409
      del SL[i]
  rewrite(timetable,"timetable.json")
  return jsonify({}),200
@app.route("/timetable/schedule",methods=["POST"])
def scheduleSection():
  obj = request.json
  day = obj["day"]
  sid = obj["sid"]
  cid = obj["cid"]
  start = int(obj["start"])
  end = int(obj["end"])
  vid = obj["vid"]
  slots = end - start + 1
  if slots < 0:
    return jsonify({'msg': 'End time cannot be less than start time!'}),500
  idx1 = None
  secList = sections["sections"]
  for i in range(len(secList)):
    print(secList[i])
    if secList[i]["name"] == sid and secList[i]["courseID"] == cid:
      idx1 = i
      break
  instID = secList[idx1]["instID"]
  insIDX = searchObj("id",instID,inst["inst"])
  secINST = inst["inst"][insIDX]
  if "slots" in secINST:
    istart = int(secINST["slots"][0])
    iend = int(secINST["slots"][1])
    print(start,end)
    print(istart,iend)
    if start < istart or end>iend or start > iend or end < istart:
      return jsonify({'msg': 'Instructor of section prefers to teach only in slot range['+str(istart)+","+str(iend)+"]"}),409
  # check if section can be scheduled
  # dark magic logic
  
  # check if sections scheduled in same slots clash with this new section scheduling  
  tocheck = timetable[day]
  i = start
  tochange = []
  for j in range(slots):
      classes = tocheck[i-1]
      for k in range(len(classes)):
        sec = classes[k]
        if sid[:-1] == sec["name"][:-1] and ((sid[-1:] == "1" and sec["name"][-1:]=="2") or (sid[-1:] == "2" and sec["name"][-1:]=="1")) and cid == sec["courseID"]:
          pass
        else:
          if sec["venue"] == vid: # Venue Clash!
            return jsonify({'msg': 'Venue clash! Section '+sec["name"]+" has a class of"+sec["courseName"]+" at "+sec["venue"]+" at that time"}),409
          if sec["name"] == sid: # same section is having a class in the same slot already!
            return jsonify({'msg': 'The section has another class of '+sec["courseName"]+" at that time!"}),409
        if sec["instID"] == sections["sections"][idx1]["instID"] and sec["venue"] != vid:
          return jsonify({'msg': 'Section can not be scheduled because teacher of this section is teaching class of '+sec["courseName"]+" at the requested time!"}),409
        
      tochange.append(classes)
      i+=1
  # No clash
   
  #print(tochange)
  idx = searchObj("id",cid,courses["courses"])
  
  for i in range(len(tochange)):
    tochange[i].append({"name": sid,"courseID": cid,"venue": vid,"courseName": courses["courses"][idx]["name"],"dept": sections["sections"][idx1]["dept"],"instID": sections["sections"][idx1]["instID"]})
   
  rewrite(sections,"sections.json")
  rewrite(timetable,"timetable.json")
  return jsonify({}),200
@app.route("/timetable/slim/<dept>",methods=["GET"])
def slimTable(dept):
  SL = sections["sections"]
  req = []
  for i in range(len(SL)):
    if(SL[i]["dept"] == dept):
      if searchObj("name",SL[i]["name"],req)!=None:
        pass
      elif (SL[i]["name"][-1:] == "1" or SL[i]["name"][-1:] == "2") and searchObj("name",SL[i]["name"][:-1],req)!=None:
        pass
      else:  
        req.append(SL[i])
  # all CS sections are in req list
  print()
  tts = {}
  days = ["monday","tuesday","wednesday","thursday","friday","saturday"]
  for i in range(len(req)):
    print(req[i]["name"])
    # generate table of section and add it to tts
    
    slim = {}
    maxCourses = 0
    for m in range(len(days)):
      curr = days[m]
      slim[curr] = []
      T = timetable[curr]
      count = 0
      for j in range(8):
        secs = T[j]
        for k in range(len(secs)):
          if (secs[k]["name"] == req[i]["name"] or req[i]["name"]+"1" == secs[k]["name"] or req[i]["name"]+"2" == secs[k]["name"]) and secs[k]["dept"] == dept:
            slim[curr].append({"venue": secs[k]["venue"],"slot": str(j+1),"courseName": secs[k]["courseName"]})
            count+=1
      if slim[curr] == []:
        del slim[curr]
      if(count >= maxCourses):
        maxCourses = count
    slim["maxCourses"] = maxCourses
    tts[req[i]["name"]] = slim
  print(tts)
  #secE = {"BCS-5E": tts[0]}
  f = open("dummy.json","w")
  f.write(json.dumps(tts,indent=4))
  f.close()
  return jsonify(tts),200
@app.route("/exportConfig",methods=["GET"])
def exportCONFIG():
  res = {}
  res["inst"] = inst["inst"]
  res["courses"] = courses["courses"]
  res["venues"] = venues["venues"]
  res["timetable"] = timetable
  res["sections"] = sections["sections"]
  
  return jsonify(res),200
@app.route("/loadConfig",methods=["POST"])
def importConfig():
  res = request.json
  inst["inst"] = res["inst"]
  courses["courses"] = res["courses"]
  venues["venues"] = res["venues"]
  timetable = res["timetable"]
  sections["sections"] = res["sections"]
  
  rewrite(inst,"inst.json")
  rewrite(courses,"courses.json")
  rewrite(venues,"venues.json")
  rewrite(timetable,"timetablejson")
  rewrite(sections,"sections.json")
    
##
loadData()
app.run()
