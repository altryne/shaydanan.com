/**
 Some examples of the webstorm intentions abilities
**/


/*  replace switch with if */
switch(i){
	case 0:

	break;
	case 1:

	break;
}












/*  Language injections */

var some_html = 'div'; //html gets injected automatically

var some_css = "div{background:green; margin-bottom: 5px; padding-top: 10px; } span{ background: green; margin-bottom: 15%;}";










/*  simplify if else */
function f(a) {
  if (a) {
    return true;
  }
  return false;
}





/* jQuery intensions */

$('#main a').html('');

for (var i in some_css) {
	a = $('#main a').html('');
	a.html();
}



/* convert params to obj */

function name(sup){
	var a = sup.a;
	var b = sup.b;
	var c = sup.c;
}

$('div').toggleClass()
/**** REFACTORING *****/

function myMethod(Bool, string, obj) {

}

myMethod(false, "string", {person: "ironman"})



/**
 * This is a simple documentation example
 * @param age {integer} - sets the age of the person
 * @param name {string} - persons name
 * @param job {string} - persons job description
 * @returns {{age: *, name: *, job: *}}
 */
var myFunc = function (age, name, job) {
    var person = {
        age: age,
        name: name,
        job: job
    };
    return person
};
myFunc(age,name,job)


