var courses = null;
var apiHost = "http://localhost/flask";
function deleteCourse()
{
  var tr = this.parentElement.parentElement;
  alert(tr.children[0].innerHTML);
}


function listCourses()
{
   axios.get(apiHost+"/courses").then(response =>{

      var CL = response["data"]["courses"];
      var table = document.getElementById("data");
      
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
         var delBtn = document.createElement("button");
         //delBtn.onclick = "deleteCourse(this.parent.parent)";
         //delBtn.addEventListener("onclick",deleteCourse);
         delBtn.onclick = deleteCourse;
         delBtn.innerHTML = "Delete";
         tr.children[3].appendChild(delBtn);
         tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      
    })

}
function addCourse()
{

}
