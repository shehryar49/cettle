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
    var ven1 = document.getElementById("venue-select1");
    ven.innerHTML = "";
    ven1.innerHTML = "";
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
      var opt1 = document.createElement("option");
      opt.innerHTML = venues[i].id;
      opt.value = venues[i].id;
      
      ven.appendChild(opt);
      opt1.innerHTML = venues[i].id;
      opt1.value = venues[i].id;
      ven1.appendChild(opt1);
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
  var table = document.getElementById("tt");
  table.innerHTML = "";
  loadVenues();
  loadSections();
 // return null;
  var day = document.getElementById("day-select").value;
  var dept = document.getElementById("dept-select").value;

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

function makeAcronym(str)
{
  var words = str.split(" ");
  var acro = "";
  for(var i=0;i<words.length;i++)
  {
    if(words[i].toUpperCase() == "LAB")
      acro += " Lab";
    else if(words[i].length >=1 && words[i].toUpperCase()!="AND")
      acro += words[i][0];
    
  }
  return acro.toUpperCase();
}
function exportTT()
{

  var dept = document.getElementById("dept-select").value;
  var div = document.getElementById("exported");
  div.innerHTML = '<h1 style="text-align: center">'+dept+'&nbsp;    timetable</h1><br><br><h6>Generated using Cettle</h6><br><br>';
  
  var slots = [
    null,
    "8:30 - 9:50",
    "10:00 - 11:20",
    "11:30 - 12:50",
    "1:00 - 2:20",
    "2:30 - 3:50",
    "4:00 - 5:20",
    "5:30 - 6:50",
    "7:00 - 8:20"
  ];
  axios.get(apiHost+"/timetable/slim/"+dept).then(response => {
   
    var data = response.data;
    for(var key in data)
    {
      var sec = key;
      for(var u=1;u<=5;u+=1){
      
      var table = document.createElement("table");
      table.classList.add("table");
      table.classList.add("table-bordered");
      table.classList.add("table-responsive");
      table.classList.add("tt");
      
      var head = document.createElement("tr");
      head.appendChild(document.createElement("th"));
      head.children[0].innerHTML = "Day";
      for(var i=1;i<=data[sec].maxCourses;i++)
      {
        head.appendChild(document.createElement("th"));
      }
      table.appendChild(head);
      div.innerHTML += "<h3>"+sec+"</h3><br>";
      
      var tt = data[sec];
      var days = ["monday","tuesday","wednesday","thursday","friday","saturday"];
      var i = 0;
      for(var i=0;i<days.length;i++)
      {
         if(tt.hasOwnProperty(days[i]))
         {
           var courses = tt[days[i]];
           var tr = document.createElement("tr");           
           tr.appendChild(document.createElement("td"));   
           tr.children[0].innerHTML = days[i];   
           for(var j=1;j<=courses.length;j++)
           {
             tr.appendChild(document.createElement("td"));
             tr.children[j].innerHTML = (courses[j-1].courseName) + " ( " +courses[j-1].venue+" "+slots[courses[j-1].slot] +" )";     
           }
           if(tr.children.length < tt.maxCourses+1)
           {
             var toadd = tt.maxCourses+1-tr.children.length;
             for(var k=1;k<=toadd;k++)
             {
               tr.appendChild(document.createElement("td"));
               }
           }
           table.appendChild(tr);
         }
      }

      div.appendChild(table); 
            
     }

    }
           window.jsPDF = window.jspdf.jsPDF;
  window.html2canvas = html2canvas;
var doc = new jsPDF();
doc.html(div, {
    callback: function(doc) {
        // Save the PDF
        doc.save(dept+"-timetable"+'.pdf');
    },
    autoPaging: false,
    x: 15,
    y: 15,
    width: 170, //target width in the PDF document
    windowWidth: 650 //window width in CSS pixels
}); 
  });

  
}
function slimTT()
{
  var table = document.getElementById("tt");
  var html = "";
  for(var i=0;i<table.children.length;i++)
  {
    var tr = table.children[i];
    var rowhtml = "<tr>";
    var empty = true;
    for(var j=0;j<9;j++)
    {
      var td = table.children[i].children[j];
      if(td.innerHTML != "" && j!=0)
        empty = false;
      rowhtml += "<td>"+td.textContent+"</td>";
    }
    rowhtml += "</tr>";
    if(!empty)
      html += rowhtml;
  }
  console.log(html);
}
function clearSlot()
{
  var dept = document.getElementById("dept-select").value;
  var ven = document.getElementById("venue-select1").value;
  var slot = document.getElementById("slot-to-clear").value;
  var day = document.getElementById("day-select").value;
  var payload = {"dept": dept,"venue": ven,"slot": slot,"day": day};
  
  axios.post(apiHost+"/timetable/clear",payload).then(response => {
    alert("Success");
    loadTT();
  });
}
