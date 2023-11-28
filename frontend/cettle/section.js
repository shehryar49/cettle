

document.getElementById('sectionCodeInput')
.addEventListener('paste', function(e)
{
    e.preventDefault(); // stpo default pasting

    // Get Paste string
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Split the pasted content by spaces
    const halfstring = pastedText.split(' ');
    // give halfstring to Code and section Name
    if (halfstring.length >= 1)
    {
        document.getElementById('sectionCodeInput').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('sectionNameInput').value = halfstring.slice(1).join(' ');
    }
});


$(document).ready(function() {
    $('#sectionAddButton').click(function() {
        toggleCollapse('#inputFields');
    });

    // Update
    $('#sectionUpdateButton').click(function() {
        toggleCollapse('#updateFields');
    });

    // Delete section
    $('#sectionDeleteButton').click(function() {
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
    const sectionCode = document.getElementById('sectionCodeInput').value;
    const sectionName = document.getElementById('sectionNameInput').value;
    const sectionDepartment = document.getElementById('sectionDepartmentInput').value;
    const sectionSection = document.getElementById('sectionSectionInput').value;
    const teacherAlloted = document.getElementById('teacherAllotedInput').value;
    const studentsEnrolled = document.getElementById('studentsEnrolledInput').value;

    const sectionData = {
        sectionCode, 
        sectionName, 
        sectionDepartment, 
        sectionSection, 
        teacherAlloted, 
        studentsEnrolled 
    }
    //Print
    console.log({sectionCode, sectionName, sectionDepartment, sectionSection, teacherAlloted, studentsEnrolled });


  

    //--------------------------------------------------------------------------
        fetch('https://localhost:5000/sections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sectionData })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });

        //ADD data to section table
        AddToTable(sectionData);

});

function AddToTable(sectionData) 
{
    // Call table body
    const tableBody = $('#sectionTableBody');

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
    codeField.text(sectionData.sectionCode);
    nameField.text(sectionData.sectionName);
    deptField.text(sectionData.sectionDepartment);
    sectionField.text(sectionData.sectionSection);
    allotedField.text(sectionData.teacherAlloted);
    enrolledField.text(sectionData.studentsEnrolled);

    // Append cells to the new row
    newRow.append(codeField, nameField, deptField, sectionField, allotedField, enrolledField);

    // Append the new row to the table
    tableBody.append(newRow);

}

//BOOTSTRAP 4
// $(document).ready(function() 
// {
//     $('#sectionAddButton').click(function() 
//     {
//         toggleCollapse('#inputFields');
//     });

//     // Update
//     $('#sectionUpdateButton').click(function() 
//     {
//         toggleCollapse('#updateFields');
//     });

//     //Delete section
//     $('#sectionDeleteButton').click(function() 
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

