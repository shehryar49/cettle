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
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      
      thead.children[0].children[0].innerHTML = "ID";
      thead.children[0].children[1].innerHTML = "Name";
      thead.children[0].children[2].innerHTML = "Dept";      
      thead.children[0].children[3].innerHTML = "Shift Start";
      thead.children[0].children[4].innerHTML = "Shift End";
      thead.children[0].children[5].innerHTML = "";
      table.appendChild(thead);
      var tbody = document.createElement("tbody");
      var starts = [null,"8:30","10:00","11:30","1:00","2:30","4:00","5:30","7:00"];
      var ends =   [null,"9:50","11:20","12:50","2:20","3:50","5:20","6:50","8:20"];
      
      for(var i=0;i<TL.length;i++)
      {
         var obj = TL[i];
         var tr = document.createElement("tr");
        
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.children[0].innerHTML = obj.id;
         tr.children[1].innerHTML = obj.name;
         tr.children[2].innerHTML = obj.dept;
         tr.children[3].innerHTML = "N.A";
         tr.children[4].innerHTML = "N.A";
                  
         if(obj.hasOwnProperty("slots"))
         {
           tr.children[3].innerHTML = starts[parseInt(obj.slots[0])];
           tr.children[4].innerHTML = ends[parseInt(obj.slots[1])];
         }
         var del = document.createElement("i");
         del.onclick = deleteTeacher;
         del.classList.add("fa");
         del.classList.add("fa-trash");
         tr.children[5].appendChild(del);
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
  var dept = document.getElementById("dept").value;
  if(id == '' || name == '')
  {
    notifyFail("Empty fields not allowed!");
    return null;
  }
  var payload = {"id": id,"name": name,"dept": dept};
  axios.post(apiHost+"/inst",payload).then(response => {
    
      var tbody = document.getElementsByTagName("tbody")[0];
      var tr = document.createElement("tr");
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      
      tr.children[0].innerHTML = id;
      tr.children[1].innerHTML = name;
      tr.children[2].innerHTML = dept;
      tr.children[3].innerHTML = "N.A";
      tr.children[4].innerHTML = "N.A";
      
      
      tr.children[5].appendChild(document.createElement("i"));
      tr.children[5].children[0].classList.add("fa");
      tr.children[5].children[0].classList.add("fa-trash");
      tr.children[5].children[0].onclick = deleteTeacher;
      tbody.appendChild(tr);
      notifySuccess("Teacher added!");
    
  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}
function setPref()
{
  var id = document.getElementById("tprefid").value;
  var start = document.getElementById("tprefstart").value;
  var end = document.getElementById("tprefend").value;
  if(id == "")
  {
    notifyFail("Empty fields not allowed!");
    return null;
  }  
  var payload = {"id": id,"start": start,"end": end};
  axios.post(apiHost+"/inst/addpref",payload).then(response => {
    
    notifySuccess("Preference added!");
    listTeachers();
  }).catch(error => {
    if(error.response)
    {
      notifyFail(error.response.data.msg);
    }
  });
}
