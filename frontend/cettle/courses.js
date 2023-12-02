var courses = null;
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
function deleteCourse()
{
  var tr = this.parentElement.parentElement;
  var id = tr.children[0].innerHTML;
  axios.delete(apiHost+"/courses/"+id).then(response => {
    
      var i = 0;
      for(;i<courses.length;i++)
      {
        if(courses[i].id == id)
          break;
      }
      if(i != courses.length)
        courses.splice(i,i);
      var table = tr.parentElement;
      table.removeChild(tr);
      notifySuccess("Course deleted!");
  

  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}


function listCourses()
{
   axios.get(apiHost+"/courses").then(response =>{

      var CL = response["data"]["courses"];
      var table = document.getElementById("data");
      courses = CL;
      table.innerHTML = "";
      var thead = document.createElement("thead");
      thead.appendChild(document.createElement("tr"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      
      thead.children[0].children[0].innerHTML = "ID";
      thead.children[0].children[1].innerHTML = "Name";
      thead.children[0].children[2].innerHTML = "Dept";
      thead.children[0].children[3].innerHTML = "";
      table.appendChild(thead);
      var tbody = document.createElement("tbody");
     
      for(var i=0;i<CL.length;i++)
      {
         var obj = CL[i];
         var tr = document.createElement("tr");
        
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.children[0].innerHTML = obj.id;
         tr.children[1].innerHTML = obj.name;
         tr.children[2].innerHTML = obj.department;
         var del = document.createElement("i");
         del.onclick = deleteCourse;
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
function addCourse()
{
  var id = document.getElementById('cid').value;
  var dept = document.getElementsByTagName("select")[0].value;
  var name = document.getElementById("cname").value;
  var payload = {"id": id,"department": dept,"name": name};
  axios.post(apiHost+"/courses",payload).then(response => {
    
      var tbody = document.getElementsByTagName("tbody")[0];
      var tr = document.createElement("tr");
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.children[0].innerHTML = id;
      tr.children[1].innerHTML = name;
      tr.children[2].innerHTML = dept;
      tr.children[3].appendChild(document.createElement("i"));
      tr.children[3].children[0].classList.add("fa");
      tr.children[3].children[0].classList.add("fa-trash");
      tr.children[3].children[0].onclick = deleteCourse;
      tbody.appendChild(tr);
      notifySuccess("Course added!");
    
  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}
