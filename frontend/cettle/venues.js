var venues = null;
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
function deleteVenue()
{
  var tr = this.parentElement.parentElement;
  var id = tr.children[0].innerHTML;
  axios.delete(apiHost+"/venues/"+id).then(response => {
    
      var i = 0;
      for(;i<venues.length;i++)
      {
        if(venues[i].id == id)
          break;
      }
      if(i != venues.length)
        venues.splice(i,i);
      var table = tr.parentElement;
      table.removeChild(tr);
      notifySuccess("Venue deleted!");
  

  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}


function listVenues()
{
   axios.get(apiHost+"/venues").then(response =>{

      var VL = response["data"]["venues"];

      var table = document.getElementById("data");
      venues = VL;
      table.innerHTML = "";
      var thead = document.createElement("thead");
      thead.appendChild(document.createElement("tr"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));
      thead.children[0].appendChild(document.createElement("th"));      
      thead.children[0].children[0].innerHTML = "ID";
      thead.children[0].children[1].innerHTML = "Seats";
      thead.children[0].children[2].innerHTML = "Dept";
      thead.children[0].children[3].innerHTML = "";
            
      table.appendChild(thead);
      var tbody = document.createElement("tbody");
     
      for(var i=0;i<VL.length;i++)
      {
         var obj = VL[i];
         var tr = document.createElement("tr");
        
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
         tr.appendChild(document.createElement("td"));
                  
         tr.children[0].innerHTML = obj.id;
         tr.children[1].innerHTML = obj.seats;
         tr.children[2].innerHTML = obj.dept;
         var del = document.createElement("i");
         del.onclick = deleteVenue;
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
function addVenue()
{
  var id = document.getElementById('vid').value;
  var seats = document.getElementById("vseats").value;
  var dept = document.getElementById("dept").value;
  
  if(id == '' || seats == '' || dept=="")
  {
    notifyFail("Empty fields not allowed!");
    return null;
  }
  var payload = {"id": id,"seats": seats,"dept": dept};
  axios.post(apiHost+"/venues",payload).then(response => {
    
      var tbody = document.getElementsByTagName("tbody")[0];
      var tr = document.createElement("tr");
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));
      tr.appendChild(document.createElement("td"));      
      tr.children[0].innerHTML = id;
      tr.children[1].innerHTML = seats;
      tr.children[2].innerHTML = dept;
      tr.children[3].appendChild(document.createElement("i"));
      tr.children[3].children[0].classList.add("fa");
      tr.children[3].children[0].classList.add("fa-trash");
      tr.children[3].children[0].onclick = deleteVenue;
      tbody.appendChild(tr);
      notifySuccess("Venue added!");
    
  }).catch(function (error){
     if(error.response)
     {
       notifyFail(error.response.data.msg);
     }
  });
}
