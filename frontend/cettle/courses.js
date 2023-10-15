

document.getElementById('courseCodeInput')
.addEventListener('paste', function(e)
{
    e.preventDefault(); // stpo default pasting

    // Get Paste string
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Split the pasted content by spaces
    const halfstring = pastedText.split(' ');
    // give halfstring to Code and Course Name
    if (halfstring.length >= 1)
    {
        document.getElementById('courseCodeInput').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('courseNameInput').value = halfstring.slice(1).join(' ');
    }
});


$(document).ready(function() {
    $('#courseAddButton').click(function() {
        toggleCollapse('#inputFields');
    });

    // Update
    $('#courseUpdateButton').click(function() {
        toggleCollapse('#updateFields');
    });

    // Delete Course
    $('#courseDeleteButton').click(function() {
        toggleCollapse('#deleteFields');
    });

    function toggleCollapse(target) {
        var $target = $(target);
        if ($target.hasClass('show')) {
            $target.collapse('hide');
        } else {
            $('.collapse').collapse('hide');
            $target.collapse('show');
        }
    }
});


document.getElementById('addButton').addEventListener('click', function() {
    const courseCode = document.getElementById('courseCodeInput').value;
    const courseName = document.getElementById('courseNameInput').value;
    const courseDepartment = document.getElementById('courseDepartmentInput').value;
    const courseSection = document.getElementById('courseSectionInput').value;
    const teacherAlloted = document.getElementById('teacherAllotedInput').value;
    const studentsEnrolled = document.getElementById('studentsEnrolledInput').value;

    const courseData = {
        courseCode, 
        courseName, 
        courseDepartment, 
        courseSection, 
        teacherAlloted, 
        studentsEnrolled 
    }
    //Print
    console.log({courseCode, courseName, courseDepartment, courseSection, teacherAlloted, studentsEnrolled });


    //--------------------------------------------------------------------------
        fetch('https://localhost:5000/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseData })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });

        //ADD data to course table
        AddToTable(courseData);

});

function AddToTable(courseData) 
{
    // Call table body
    const tableBody = $('#courseTableBody');

    // Create a new row
    const newRow = $('<tr>');

    // Cell data for each
    const codeField = $('<td>');
    const nameField = $('<td>');
    const deptField = $('<td>');
    const sectionField = $('<td>');
    const allotedField = $('<td>');
    const enrolledField = $('<td>');

    // Populate cells with content
    codeField.text(courseData.courseCode);
    nameField.text(courseData.courseName);
    deptField.text(courseData.courseDepartment);
    sectionField.text(courseData.courseSection);
    allotedField.text(courseData.teacherAlloted);
    enrolledField.text(courseData.studentsEnrolled);

    // Append cells to the new row
    newRow.append(codeField, nameField, deptField, sectionField, allotedField, enrolledField);

    // Append the new row to the table
    tableBody.append(newRow);

}

//BOOTSTRAP 4
// $(document).ready(function() 
// {
//     $('#courseAddButton').click(function() 
//     {
//         toggleCollapse('#inputFields');
//     });

//     // Update
//     $('#courseUpdateButton').click(function() 
//     {
//         toggleCollapse('#updateFields');
//     });

//     //Delete Course
//     $('#courseDeleteButton').click(function() 
//     {
//         toggleCollapse('#deleteFields');
//     });

//     function toggleCollapse(target) 
//     {                                       // if target button is open then close
//         var $target = $(target);            // else, close all and then open it
//         if ($target.hasClass('show')) 
//         {
//             $target.collapse('hide');
//         } 
//         else 
//         {
//             $('.collapse').collapse('hide');    // Try to Remove delay in FINAL VERSION
//             $target.collapse('show');           // ^Done and it looks Cooler than expected
//         }
//     }
// });

