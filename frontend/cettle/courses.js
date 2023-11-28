//---------> FOR ADD
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

//---------> FOR UPDATE
document.getElementById('courseCodeUpdate')
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
        document.getElementById('courseCodeUpdate').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('courseNameUpdate').value = halfstring.slice(1).join(' ');
    }
});




//---------> FOR DELETE
document.getElementById('courseCodeDelete')
.addEventListener('paste', function(e)
{
    e.preventDefault(); // stop default pasting

    // Get Paste string
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Split the pasted content by spaces
    const halfstring = pastedText.split(' ');
    // give halfstring to Code and Course Name
    if (halfstring.length >= 1)
    {
        document.getElementById('courseCodeDelete').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('courseNameDelete').value = halfstring.slice(1).join(' ');
    }
});



$(document).ready(function() 
{
    $('#courseAddButton').click(function() 
    {
        toggleCollapse('#courseInputFields');
    });

    // Update
    $('#courseUpdateButton').click(function() 
    {
        toggleCollapse('#courseUpdateFields');
    });

    //Delete Course
    $('#courseDeleteButton').click(function() 
    {
        toggleCollapse('#courseDeleteFields');
    });

    function toggleCollapse(target) 
    {                                       // if target button is open then close
        var $target = $(target);            // else, close all and then open it
        if ($target.hasClass('show')) 
        {
            $target.collapse('hide');
        } 
        else 
        {
            $('.collapse').collapse('hide');    // Try to Remove delay in FINAL VERSION
            $target.collapse('show');           // ^Done and it looks Cooler than expected
        }
    }


    $('#addcourseButton').click(function() {
        // Collect course information from input fields
        const courseCode = document.getElementById('courseCodeInput').value;
        const courseName = document.getElementById('courseNameInput').value;
        const coursePreferredTime = document.getElementById('coursePreferredTimeInput').value;

        // Create an object with the collected data
        const courseData = {
            courseCode,
            courseName,
            coursePreferredTime
        };
        console.log(courseData);
        var jsonData = JSON.stringify(courseData);
        console.log(jsonData);

        //--------------------------------------------------------------------------
        fetch('https://localhost:5000/course', {
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
    const timeField = $('<td>');

    // Populate cells with content
    codeField.text(courseData.courseCode);
    nameField.text(courseData.courseName);
    timeField.text(courseData.coursePreferredTime);

    // Append cells to the new row
    newRow.append(codeField, nameField, timeField);

    // Append the new row to the table
    tableBody.append(newRow);

}
