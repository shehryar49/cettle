var courses = null;
var apiHost = "http://localhost:5000/";
function listCourses()
{
   axios.get(apiHost+"courses/").then(response =>{
    //Do stuff with the response.
      alert(response.json());
    })

}
function addCourse()
{

}
function deleteCourse(row)
{

}

