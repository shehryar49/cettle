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
function deleteTeacher()
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


function listTeachers()
{
   axios.get(apiHost+"/inst").then(response =>{

      var TL = response["data"]["inst"];

      var table = document.getElementById("data");
      teachers = TL;
      table.innerHTML = "";
      var thead = document.createElement("thead");
      thead.appendChild(document.createElement("tr"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      
      thead.children[0].children[0].innerHTML = "ID";
      thead.children[0].children[1].innerHTML = "Name";
      thead.children[0].children[2].innerHTML = "";
      table.appendChild(thead);
      var tbody = document.createElement("tbody");
     
      for(var i=0;i<TL.length;i++)
      {
         var obj = TL[i];
         var tr = document.createElement("tr");
        
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.children[0].innerHTML = obj.id;
         tr.children[1].innerHTML = obj.name;
         var del = document.createElement("i");
         del.onclick = deleteTeacher;
         del.classList.add("fa");
         del.classList.add("fa-trash");
         tr.children[2].appendChild(del);
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
function addTeacher()
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
