
AMD'ing underscore-1.4.2

1. save "Development Version (1.4.2)" from http://underscorejs.org/underscore.js


2. in analog with jquery-1.8.3, added around line 54

  // NOTE agistrilink 20121126:
  // added amd loading style - typeof exports === 'undefined' in requirejs environment
  // weakened the third && in comparison with jquery, as line 1963 of requirejs only
  // defines an entry for jQuery: define.amd = { jQuery: true }; 
  if ( typeof define === "function" && define.amd /* && define.amd.underscore */) {
		define( "underscore", [], function () { return _; } );
  }
  else
  // end of added

test with e.g. alert(_.each([1, 2, 3], function(num){ alert(num); }););