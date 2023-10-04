

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
});













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

