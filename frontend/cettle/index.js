document.addEventListener("DOMContentLoaded", function () {

    var sidebarToggler = document.getElementById("sidebar-toggler");
    var sidebar = document.getElementById("sidebar");
    var sidebarTogglerIcon = document.getElementById("navicon");

    sidebarToggler.addEventListener("click", function () {
        sidebar.classList.toggle("active");

    });

    document.addEventListener("click", function (event) {
        if (sidebar.classList.contains("active") && event.target !== sidebar && event.target !== sidebarToggler && event.target!==sidebarTogglerIcon) 
        {
            sidebar.classList.remove("active");
    }
    });


    
    // sidebarTogglerIcon.addEventListener("click", function () {
    //     sidebar.classList.toggle("active");
    //     console.log("done3");
    // });
});


//Particles
// particlesJS.load('particles-js', 'particles.json', function() {
//     console.log('callback - particles.js config loaded');
//   });


// document.addEventListener("click", function (event) /* Add event for whole document */
// {
//     var triggerButton = document.getElementById("navbar-toggler-button");
//     var sidebar = document.getElementById("sidebar");
//     console.log("Clicked outside the sidebar");
//     // Check if Click is not on sidebar
//     if (event.target != sidebar && event.target !== triggerButton) 
//     {
//         console.log("Clicked outside the sidebar");
//         triggerSidebar();
//     }
// });


// function triggerSidebar()
// {
//     var sb = document.getElementById("sidebar");

//     if (sb.classList.contains("active")) /* if already active, close; elsewise */
//     {
//         closeSidebar();
//     }
// }

// function openSidebar() 
// {   //get id of sidebar then wait for call of OnButtionClick trigger:active
//     console.log("openSidebar called");
//     document.getElementById("sidebar").classList.toggle("active");
// }

// function closeSidebar() 
// {
//     // if sidebar already open
//     if ($('#sidebar').hasClass('active')) 
//     {
//         console.log("closeSidebar called");
//         // Close it by deleting active class
//         $('#sidebar').removeClass('active');
//     }
// }