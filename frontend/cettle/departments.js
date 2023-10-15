

//Bootstrap 5 Compatible:
$(document).ready(function () {
    $('#deptAddButton').click(function () 
    {
        toggleCollapse('#inputFields');
    });

    // Update
    $('#deptUpdateButton').click(function () 
    {
        toggleCollapse('#updateFields');
    });

    // Delete Department
    $('#deptDeleteButton').click(function ()
    {
        toggleCollapse('#deleteFields');
    });

    function toggleCollapse(target)         // if target button is open then close
    {
        var $target = $(target);
        if ($target.hasClass('show')) 
        {
            $target.collapse('hide');
        } 
        else                                // Syncs both the Transition 
        {
            $('.collapse').collapse('hide');
            $target.collapse('show');
        }
    }

    //------------------- Department information add
    $('#addDepartmentButton').click(function() {
        // Collect department information from input fields
        const deptCode = document.getElementById('departmentCodeInput').value;
        const deptName = document.getElementById('departmentNameInput').value;

        // Create an object with the collected data
        const deptData = {
            deptCode: deptCode,
            deptName: deptName
        };

        // Convert the data to JSON
        const departmentJsonData = JSON.stringify(deptData);

        // Log the JSON data
        console.log(departmentJsonData);
    });
});


//-------------------------DATA Handlers

$('#addDepartmentButton').click(function() {
    // dept input fields
    const departmentCode = document.getElementById('departmentCodeInput').value;
    const departmentName = document.getElementById('departmentNameInput').value;

    const departmentData = {
        departmentCode,
        departmentName
    };
    
    //Print
    console.log(departmentData);
    
    // for .JSON storage
    var departmentJsonData = JSON.stringify(departmentData);




        //--------------------------------------------------------------------------
        fetch('https://localhost:5000/departments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ departmentData })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });


        //ADD data to department's table
        AddToTable(departmentData);
});


// Function to place data in the table
function AddToTable(departmentData) 
{
    // Call table body
    const tableBody = $('#departmentTableBody');

    // Create a new row
    const newRow = $('<tr>');

    // Cell data for each
    const deptCodeField = $('<td>');
    const deptNameField = $('<td>');

    // Populate cells with content
    deptCodeField.text(departmentData.departmentCode);
    deptNameField.text(departmentData.departmentName);

    // Append cells to the new row
    newRow.append(deptCodeField, deptNameField);

    // Append the new row to the table
    tableBody.append(newRow);

}







// $(document).ready(function() 
// {
//     $('#deptAddButton').click(function() 
//     {
//         toggleCollapse('#inputFields');
//     });

//     // Update
//     $('#deptUpdateButton').click(function() 
//     {
//         toggleCollapse('#updateFields');
//     });

//     //Delete Course
//     $('#deptDeleteButton').click(function() 
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

