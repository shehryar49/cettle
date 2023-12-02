var apiHost = "/flask";
var tt = null;
var venues = null;
function loadVenues()
{
  var dept = document.getElementById("dept-select").value;
    var table = document.getElementById("tt");
  axios.get(apiHost+"/venues").then(response => {
    venues = response.data["venues"];
    console.log(venues);
    table.innerHTML = "";
    var texts = ["Venue","8:30","10:00","11:30","1:00","2:30","4:00","5:30","7:00"];
    var tr = document.createElement("tr");
    for(var i=1;i<=9;i++)
    {
      var th = document.createElement("th");
      th.innerHTML = texts[i-1];
      tr.appendChild(th);
    }
    table.appendChild(tr);
    for(var i=0;i<venues.length;i++){
      if(venues[i].id.substr(0,dept.length) == dept){
        var tr = document.createElement("tr");
        for(var j=1;j<=9;j++){
          var td  = document.createElement("td");
          td.innerHTML = "dummy";
          tr.appendChild(td);
         
        }

        tr.children[0].innerHTML = venues[i].id;
        table.appendChild(tr);
      }
    }
  });
}
function loadTT()
{
  loadVenues();
  var day = document.getElementById("day-select").value;
  axios.get(apiHost+"/timetable").then( response => {
    console.log(response.data[day]);
    tt = response.data;
    var slots = response.data[day]; //8 slots
    for(var i=0;i<slots.length;i++)
    {
      var sections = slots[i]; //sections having classes at ith slot
      
    }
    
  });
}