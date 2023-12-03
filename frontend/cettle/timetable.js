var apiHost = "/flask";
var tt = null;
var venues = null;
var sections = null;
function init()
{

}
async function loadVenues() //loads venues of selected department
{
    var dept = document.getElementById("dept-select").value;
    var table = document.getElementById("tt");
    var ven = document.getElementById("venue-select");
    ven.innerHTML = "";
  await axios.get(apiHost+"/venues").then(response => {
    venues = response.data["venues"];
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
      var opt = document.createElement("option");
      opt.innerHTML = venues[i].id;
      opt.value = venues[i].id;
      ven.appendChild(opt);
      if(venues[i].dept == dept){
        var tr = document.createElement("tr");
        for(var j=1;j<=9;j++){
          var td  = document.createElement("td");
          td.innerHTML = "";
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
  loadSections();
 // return null;
  var day = document.getElementById("day-select").value;
  var dept = document.getElementById("dept-select").value;
  var table = document.getElementById("tt");
  axios.get(apiHost+"/timetable").then( response => {
    tt = response.data;
    var slots = response.data[day]; //8 slots
    for(var i=0;i<slots.length;i++)
    {
      var sections = slots[i]; //sections having classes at ith slot
      for(var j=0;j<sections.length;j++)
      {
      //  alert(sections[j].venue);
        var L = table.children;
        var found = false;
        for(var k=0;k<L.length;k++)
        {
          if(L[k].children[0].textContent == sections[j].venue)
          {
            L[k].children[i+1].innerHTML = sections[j].courseName+"( "+sections[j].name+")";//+"ok";
            found = true;
            break;
            
          }
        }
        if(!found && sections[j].dept == dept)
        {
          var tr = document.createElement("tr");
          for(var m=0;m<9;m++)
          {
            var td = document.createElement("td");
            if(m == 0)
              td.innerHTML = sections[j].venue;
            if(m == i+1)
              td.innerHTML = sections[j].courseName+" ("+sections[j].name+")";
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
      }
    }
    
  });
}
async function loadSections() //loads sections of selected department
{
  var dept = document.getElementById("dept-select").value;
  var sect = document.getElementById("section-select");
  sect.innerHTML = "";
  await axios.get(apiHost+"/sections/"+dept).then(response => {
    sections = response.data["sections"];
    for(var i=0;i<sections.length;i++)
    {
        
        var opt = document.createElement("option");
        if(sections[i].name != null)
          opt.innerHTML = sections[i].courseName+ " ("+sections[i].name+")";
        else
          opt.innerHTML = sections[i].courseID+ " ("+sections[i].name+")";
        opt.value = i;
        sect.appendChild(opt);
    }
  });
}
function scheduleSection()
{
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var idx = parseInt(document.getElementById("section-select").value);
  var sid = sections[idx].name;
  var venue = document.getElementById("venue-select").value;
  var cid = sections[idx].courseID;
  var day = document.getElementById("day-select").value;
  var payload = {"start": start,"end": end,"sid": sid,"cid": cid,"day": day,"vid": venue};
  console.log(payload);
  axios.post(apiHost+"/timetable/schedule",payload).then(response => {
   // alert("Success");
    loadTT();
  }).catch(error => {
    if(error.response){
//      console.log(error.response);
      alert(error.response.data.msg);
    }
  });
}


function exportTT()
{

}
