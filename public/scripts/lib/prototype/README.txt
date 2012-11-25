
AMD'ing prototype-1.7.1 language extensions


1. zipped prototype tag 1.7.1 from github
	https://github.com/sstephenson/prototype/tree/1.7.1


2. took src/prototype.js and lang/*.js and put in lib/prototype/1.7.1-amd


3. amd'ed the files with dependencies on the basis of
	https://github.com/Rixius/prototype.node.js/tree/master/lib

Up till now with only Class tested in conjuction with $super two major remarks/changes:

3.1 Changed class.js:55 (dependency on $A)

	// Note agistrilink 20121125:
	// Get rid of the dependency from $A, it results in loading all files
	// and is only used here
//	var parent = null, properties = $A(arguments);
	var parent = null, properties = [].slice.call(arguments);

3.2 Added the depency of class.js on function.js, e.g. for class.js:165
	
	// Note Safa.Ri 20121125: argumentNames() requires ./function
	value.argumentNames()[0] == "$super") {

	
Alternative shim'ing in as-is prototype using follwoing shim for require,
in the requirejs.config call

			paths: {
		        'prototype': 'lib/prototype/1.7.1/prototype',
			}
							
 			// Alternative shim config - usage of amd prefered
			// use Prototype.Class having prototype as a dependency
			// all the Object.extend, etc come for free
		    shim: {
			    'prototype': {
				    exports: 'Class',
				    init: function () {
					    alert ('shim init called');
					    return {
						    Class: Class
					    };
				    }
			    }
		    }
