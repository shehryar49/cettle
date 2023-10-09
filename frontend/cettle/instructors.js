//---------> FOR ADD
document.getElementById('teacherCodeInput')
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
        document.getElementById('teacherCodeInput').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('teacherNameInput').value = halfstring.slice(1).join(' ');
    }
});

//---------> FOR UPDATE
document.getElementById('teacherCodeUpdate')
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
        document.getElementById('teacherCodeUpdate').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('teacherNameUpdate').value = halfstring.slice(1).join(' ');
    }
});




//---------> FOR DELETE
document.getElementById('teacherCodeDelete')
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
        document.getElementById('teacherCodeDelete').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('teacherNameDelete').value = halfstring.slice(1).join(' ');
    }
});



$(document).ready(function() 
{
    $('#teacherAddButton').click(function() 
    {
        toggleCollapse('#teacherInputFields');
    });

    // Update
    $('#teacherUpdateButton').click(function() 
    {
        toggleCollapse('#teacherUpdateFields');
    });

    //Delete Course
    $('#teacherDeleteButton').click(function() 
    {
        toggleCollapse('#teacherDeleteFields');
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

    $('#addTeacherButton').click(function() {
        // Collect instructor information from input fields
        const teacherCode = document.getElementById('teacherCodeInput').value;
        const teacherName = document.getElementById('teacherNameInput').value;
        const teacherPreferredTime = document.getElementById('teacherPreferredTimeInput').value;

        // Create an object with the collected data
        const instructorData = {
            teacherCode,
            teacherName,
            teacherPreferredTime
        };
        console.log(instructorData);
        var jsonData = JSON.stringify(instructorData);
        console.log(jsonData);
    });



});
