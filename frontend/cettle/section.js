//---------> FOR ADD
document.getElementById('sectionCodeInput')
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
        document.getElementById('sectionCodeInput').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('sectionNameInput').value = halfstring.slice(1).join(' ');
    }
});

//---------> FOR UPDATE
document.getElementById('sectionCodeUpdate')
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
        document.getElementById('sectionCodeUpdate').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('sectionNameUpdate').value = halfstring.slice(1).join(' ');
    }
});




//---------> FOR DELETE
document.getElementById('sectionCodeDelete')
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
        document.getElementById('sectionCodeDelete').value = halfstring[0];
    }
    if (halfstring.length >= 2)
    {
        document.getElementById('sectionNameDelete').value = halfstring.slice(1).join(' ');
    }
});



$(document).ready(function() 
{
    $('#sectionAddButton').click(function() 
    {
        toggleCollapse('#sectionInputFields');
    });

    // Update
    $('#sectionUpdateButton').click(function() 
    {
        toggleCollapse('#sectionUpdateFields');
    });

    //Delete Course
    $('#sectionDeleteButton').click(function() 
    {
        toggleCollapse('#sectionDeleteFields');
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


    $('#addsectionButton').click(function() {
        // Collect section information from input fields
        const sectionCode = document.getElementById('sectionCodeInput').value;
        const sectionName = document.getElementById('sectionNameInput').value;
        const sectionPreferredTime = document.getElementById('sectionPreferredTimeInput').value;

        // Create an object with the collected data
        const sectionData = {
            sectionCode,
            sectionName,
            sectionPreferredTime
        };
        console.log(sectionData);
        var jsonData = JSON.stringify(sectionData);
        console.log(jsonData);

        //--------------------------------------------------------------------------
        fetch('https://localhost:5000/section', {
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
    const timeField = $('<td>');

    // Populate cells with content
    codeField.text(sectionData.sectionCode);
    nameField.text(sectionData.sectionName);
    timeField.text(sectionData.sectionPreferredTime);

    // Append cells to the new row
    newRow.append(codeField, nameField, timeField);

    // Append the new row to the table
    tableBody.append(newRow);

}
