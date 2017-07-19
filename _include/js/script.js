/** Modélisation des contraintes **/
//fonction objectif
var optimisation = "Maximize \n";
objective = "obj:";
variables = "Bounds \n";
variableList = "General \n";
var nbConstraint = 2;
// pour le temps
timeConstraint = "lim_1:";
//pour le prix
priceConstraint = "lim_2:";

constraints = "\nSubject To \n";

linearProgram = "";

function init()
{
	console.log('init call');
	timeConstraint = "lim_1:";
//pour le prix
	priceConstraint = "lim_2:";
	constraints = "\nSubject To \n";
	objective = "obj:";
	variables = "Bounds \n";
	variableList = "General \n";




	jsonQ.each(places, function (key, value) {
		//console.log(key + ' : ' + value);
		variables += key + " <= 1 \n";
		variableList += key+" ";
		objective += " +1 "+key;
		timeConstraint += " +"+value.duree+" "+key;
		priceConstraint += " +"+value.prix+" "+key;
	});


	timeConstraint += " <= " + TEMPS;
	priceConstraint += " <= " + BUDGET;

	constraints += timeConstraint+"\n" + priceConstraint+"\n";

	variables += variableList + "\nEnd";

	linearProgram = "";

	//Enfin la chaine contenant tout le programme linéaire
	linearProgram = optimisation+objective+constraints+variables;

}




/**fonctions et variables pour la résolution**/
//Variable de résultat
var result = {};
result.site = [];
result.obj = 0;
result.depense = 0;
result.duree = 0;


//fonctions d'ajout des contraintes

//visiter les 2 sites proches au lieu d'un seul
function nearConstraint(){
	var val;
	jsonQ.each(placeDistances, function (key, value) {
		var naibors = value.distanceTo;
		var site = key;
		jsonQ.each(naibors, function (key, value) {
			if(value <= NEARBY_DISTANCE){
				nbConstraint++;
				var newConstraint= "lim_" + nbConstraint + ": +1 "+ site + " -1 " + key +" = 0\n";
				addConstraint(newConstraint);
			}

		});	

	});
}



//a et b
function andConstraint(a, b){
	absolutelyConstraint(a);
	absolutelyConstraint(b);
}

//si a alors b
function ifElseConstraint(a, b){
	nbConstraint++;
	var newConstraint= "lim_" + nbConstraint + ": +1 "+ a + " -1 " + b +" <= 0\n";
	addConstraint(newConstraint);
}

//a ou b
function orConstraint(a, b){
	nbConstraint++;
	var newConstraint= "lim_" + nbConstraint + ": +1 "+ a + " +1 " + b +" <= 2\n";
	addConstraint(newConstraint);
}

//visiter absolument a
function absolutelyConstraint(a){	
	nbConstraint++;
	var newConstraint= "lim_" + nbConstraint + ": +1 "+ a + " = 1\n";
	addConstraint(newConstraint);
}

//si a alors pas b
function ifElseNotConstraint(a, b){
	nbConstraint++;
	var newConstraint= "lim_" + nbConstraint + ": +1 "+ a + " +1 " + b +" <= 1\n";
	addConstraint(newConstraint);
}

//autres fonctions utilitaires
function save(variable, value){
	if(value == 1){
	   result.site.push(variable);
	   result.obj=result.site.length;		
	}
}

affiche = 1;

function saveResult(){
	console.log('bye bye');

	result.obj=result.site.length;
	jsonQ.each(places, function (key, value) {
		console.log('save Result');
		if(result.site.indexOf(key)!== -1){
			affiche = 0;
			console.log('ok my boy');
			result.depense += value.prix;
		    result.duree += value.duree;
		}
	});
	console.log('bye bye  2'+result.site.length);
}
function addConstraint(constraint){
	limit = linearProgram.indexOf("Bounds");
	var begin = linearProgram.substring(0,limit);
	var end = linearProgram.substring(limit);
	linearProgram = begin + constraint + end;
}

function runs()
{
	console.log('runs');
	init();
	run();
}

function runss()
{
	run();
	init();
}

//fonction de résolution
function run(){
	console.log('inside run');
	result.site = [];
	result.obj = 0;
	result.depense = 0;
	result.duree = 0;
	//start = new Date(); 
	//logNode.innerText = "";

	var lp = glp_create_prob();
	glp_read_lp_from_string(lp, null, linearProgram);

	glp_scale_prob(lp, GLP_SF_AUTO);

	var smcp = new SMCP({presolve: GLP_ON});
	glp_simplex(lp, smcp);

	var iocp = new IOCP({presolve: GLP_ON});
	glp_intopt(lp, iocp);

	//log("obj: " + glp_mip_obj_val(lp));
	for(var k = 1; k <= glp_get_num_cols(lp); k++){
		//log(glp_get_col_name(lp, k)  + " = " + glp_mip_col_val(lp, k));
		save(glp_get_col_name(lp, k) , glp_mip_col_val(lp, k));
	}
	saveResult();
}

