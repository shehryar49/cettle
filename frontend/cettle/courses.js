

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

