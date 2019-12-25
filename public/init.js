document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
    var elems1 = document.querySelectorAll('.dropdown-trigger');
   let instances1 = M.Dropdown.init(elems1);
   var elems2 = document.querySelectorAll('.tap-target');
    var instances2 = M.TapTarget.init(elems2);
    // var elems3 = document.querySelectorAll('.tabs');
    // var instance3 = M.Tabs.init(elems3);
   
});

//   document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//    let instances = M.Dropdown.init(elems);
//   });
// Anonymous "self-invoking" function
