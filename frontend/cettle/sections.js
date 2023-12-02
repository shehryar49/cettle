var sections = null;
var courses = null;
var teachers = null;
var apiHost = "http://localhost/flask";
function clearAlert()
{

  var div = document.getElementById("alerts");
  div.innerHTML = "";  
}
function notifySuccess(msg)
{

  var div = document.getElementById("alerts");
  div.innerHTML = "";
  var alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("alert-success");
  alert.innerHTML = msg; 
  div.appendChild(alert);
  setTimeout(clearAlert,3000);
}

function notifyFail(msg)
{
  var div = document.getElementById("alerts");
  div.innerHTML = "";
  var alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("alert-warning");
  alert.innerHTML = msg;  
  div.appendChild(alert);
  setTimeout(clearAlert,3000);
}
function deleteSection()
{
  var tr = this.parentElement.parentElement;
  var id = tr.children[0].innerHTML;
  axios.delete(apiHost+"/inst/"+id).then(response => {
    
      var i = 0;
      for(;i<teachers.length;i++)
      {
        if(teachers[i].id == id)
          break;
      }
      if(i != teachers.length)
        teachers.splice(i,i);
      var table = tr.parentElement;
      table.removeChild(tr);
      notifySuccess("Teacher deleted!");
  

  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}
function getCourses()
{
 axios.get(apiHost+"/courses").then(response =>{

      var CL = response["data"]["courses"];
      courses = CL;
      var select = document.getElementById("course-select");
      for(var i=0;i<CL.length;i++)
      {
        var opt = document.createElement("option");
        opt.value = CL[i].id;
        opt.innerHTML = CL[i].name;
        select.appendChild(opt);
      }
 });
}
function getTeachers()
{
 axios.get(apiHost+"/inst").then(response =>{

      var TL = response["data"]["inst"];
      teachers = TL;
      var select = document.getElementById("teacher-select");
      for(var i=0;i<TL.length;i++)
      {
        var opt = document.createElement("option");
        opt.value = TL[i].id;
        opt.innerHTML = TL[i].name+" ("+TL[i].id+")";
        select.appendChild(opt);
      }
 });
}

function listSections()
{
   getTeachers();
   getCourses();
   axios.get(apiHost+"/sections").then(response =>{

      var SL = response["data"]["sections"];

      var table = document.getElementById("data");
      sections = SL;
      table.innerHTML = "";
      var thead = document.createElement("thead");
      thead.appendChild(document.createElement("tr"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      
      thead.children[0].children[0].innerHTML = "Name";
      thead.children[0].children[1].innerHTML = "Course ID";
      thead.children[0].children[2].innerHTML = "Teacher ID";
      thead.children[0].children[3].innerHTML = "";

      table.appendChild(thead);
      var tbody = document.createElement("tbody");
     
      for(var i=0;i<SL.length;i++)
      {
         var obj = SL[i];
         var tr = document.createElement("tr");
        
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.children[0].innerHTML = obj.name;
         tr.children[1].innerHTML = obj.courseID;
         tr.children[2].innerHTML= obj.instID;
         var del = document.createElement("i");
         del.onclick = deleteSection;
         del.classList.add("fa");
         del.classList.add("fa-trash");
         tr.children[3].appendChild(del);
         tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      
    }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });

}
function addSection()
{
  var id = document.getElementById('tid').value;
  var name = document.getElementById("tname").value;
  if(id == '' || name == '')
  {
    notifyFail("Empty fields not allowed!");
    return null;
  }
  var payload = {"id": id,"name": name};
  axios.post(apiHost+"/inst",payload).then(response => {
    
      var tbody = document.getElementsByTagName("tbody")[0];
      var tr = document.createElement("tr");
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.children[0].innerHTML = id;
      tr.children[1].innerHTML = name;
      tr.children[2].appendChild(document.createElement("i"));
      tr.children[2].children[0].classList.add("fa");
      tr.children[2].children[0].classList.add("fa-trash");
      tr.children[2].children[0].onclick = deleteTeacher;
      tbody.appendChild(tr);
      notifySuccess("Teacher added!");
    
  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}
