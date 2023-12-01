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
    // Get values from input fields
    const sectionCodeInput = document.getElementById('sectionCodeInput');
    const studentsEnrolledInput = document.getElementById('studentsEnrolledInput');
    const sectionVenueInput = document.getElementById('sectionVenueInput');
    const sectionTimeslotInput = document.getElementById('sectionTimeslotInput');

    // Validate required fields
    if (sectionCodeInput.value.trim() === '') {
        sectionCodeInput.classList.add('is-invalid');
        return;
    } else {
        sectionCodeInput.classList.remove('is-invalid');
    }

    if (studentsEnrolledInput.value.trim() === '') {
        studentsEnrolledInput.classList.add('is-invalid');
        return;
    } else {
        studentsEnrolledInput.classList.remove('is-invalid');
    }

    if (sectionVenueInput.value.trim() === '') {
        sectionVenueInput.classList.add('is-invalid');
        return;
    } else {
        sectionVenueInput.classList.remove('is-invalid');
    }

    if (sectionTimeslotInput.value === 'Timeslot') {
        sectionTimeslotInput.classList.add('is-invalid');
        return;
    } else {
        sectionTimeslotInput.classList.remove('is-invalid');
    }

    
    const sectionData = {
        sectionCode: sectionCodeInput.value,
        studentsEnrolled: studentsEnrolledInput.value,
        teacherAlloted: document.getElementById('teacherAllotedInput').value,
        sectionVenue: sectionVenueInput.value,
        sectionTimeslot: sectionTimeslotInput.value,
    };

    // Print data
    console.log(sectionData);

    // Fetch POST request
    fetch('https://localhost:5000/sections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sectionData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data sent successfully:', data);

        //CLEAR THE INPUT FIELDS
        clearInputFields();
        //**********************DO THE SAME FOR UPDATE AND DELETE{if the're valid, Action is performed} */

    })
    .catch(error => {
        console.error('Error sending data:', error);
    });

    // Add data to section table
    addToTable(sectionData);

    
});

function addToTable(sectionData) {
    // Get table body
    const tableBody = $('#sectionTableBody');

    // Create a new row
    const newRow = $('<tr>');

    // Cell data for each
    const codeField = $('<td>').text(sectionData.sectionCode);
    const enrolledField = $('<td>').text(sectionData.studentsEnrolled);
    const allotedField = $('<td>').text(sectionData.teacherAlloted);
    const venueField = $('<td>').text(sectionData.sectionVenue);
    const timeslotField = $('<td>').text(sectionData.sectionTimeslot);

    // Append cells to the new row
    newRow.append(codeField, enrolledField, allotedField, venueField, timeslotField);
    
    // Append the new row to the table
    tableBody.append(newRow);
}

function clearInputFields() {
    //clear Add section fields
    $('#sectionCodeInput, #studentsEnrolledInput, #teacherAllotedInput, #sectionVenueInput')
        .val('')
        .removeClass('is-invalid');
    
    $('#sectionTimeslotInput')
        .val('Timeslot')
        .removeClass('is-invalid');
}

function clearUpdateFields() {
    //Clear Update section fields
    $('#sectionCodeUpdate, #studentsEnrolledUpdate, #teacherAllotedUpdate, #sectionVenueUpdate')
        .val('')
        .removeClass('is-invalid');
    
    $('#sectionTimeslotUpdate')
        .val('Timeslot')
        .removeClass('is-invalid');
}

function clearDeleteFields() {
    //clear Delete section fields
    $('#sectionCodeDelete')
        .val('')
        .removeClass('is-invalid');
}



// double click any row for easy updt/dlt
$(document).on('dblclick', '#sectionTable tbody tr', function() 
{
    // Get the values from clicked row
    const sectionCode = $(this).find('td:eq(0)').text();
    const studentEnrolled = $(this).find('td:eq(1)').text();
    const teacherAlloted = $(this).find('td:eq(2)').text();
    const venue = $(this).find('td:eq(3)').text();
    const timeSlot = $(this).find('td:eq(4)').text();
    
    
    // Set the values in update section
    $('#sectionCodeUpdate').val(sectionCode);
    $('#studentsEnrolledUpdate').val(studentEnrolled);
    $('#teacherAllotedUpdate').val(teacherAlloted);
    $('#sectionVenueUpdate').val(venue);
    $('#sectionTimeslotUpdate').find('option:contains("' + timeSlot + '")').prop('selected', true); //if child is found then make it true
    
    

    // Set the values in the delete section
    $('#sectionCodeDelete').val(sectionCode);

    // Trigger the Select update BUTTON
    $('#sectionUpdateButton').click();
});




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

