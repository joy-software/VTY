/*Spécification des données*/
var places = {
'MR':{'duree':1 , 'prix':2000 ,'nom':'Le monument de la reunification'},
'PI':{'duree':0.75 , 'prix':0 ,'nom':'La place de l\'independance'},
'SV':{'duree':0.5 , 'prix':0,'nom':'Le monument dedié aux soldats' },
'MN':{'duree':2 , 'prix':5000,'nom':'Le musée national' },
'CH':{'duree':0.5 , 'prix':0,'nom':'Statut de Charles Atangana'},
'BM':{'duree':1 , 'prix':1500,'nom':'Benedictine Museum of Mont-Febe'},
'BA':{'duree':1 , 'prix':2000,'nom':'Musée Blacktitude'},
'NP':{'duree':3 , 'prix':3000,'nom':'Parc National de la Mefou'},
'CA':{'duree':1 , 'prix':200,'nom':'Les cascades du Mfoundi'},
'BS':{'duree':2 , 'prix':200,'nom':'Le Bois St-Anastasie'},
'ND':{'duree':1 , 'prix':0,'nom':'La Cathedrale Notre Dame'},
'MV':{'duree':1, 'prix':0,'nom':'La basilique Marie Reine des Apotres de Mvolye'},
'PS':{'duree': 2, 'prix':0,'nom':'Le palais polyvalent des sports'},
'PC':{'duree':3 , 'prix':0,'nom':'Le palais des congrès'}
};

var inversplaces = {
	'Le monument de la reunification':{'nom':'MR'},
	'La place de l\'independance':{'nom':'PI'},
	'Le monument dedié aux soldats' :{'nom':'SV'},
	'Le musée national':{'nom': 'MN'},
	'Statut de Charles Atangana':{'nom':'CH'},
	'Benedictine Museum of Mont-Febe':{'nom':'BM'},
	'Musée Blacktitude':{'nom':'BA'},
	'Parc National de la Mefou':{'nom':'NP'},
	'Les cascades du Mfoundi':{'nom':'CA'},
	'Le Bois St-Anastasie':{'nom':'BS'},
	'La Cathedrale Notre Dame':{'nom':'ND'},
	'La basilique Marie Reine des Apotres de Mvolye':{'nom':'MV'},
	'Le palais polyvalent des sports':{'nom':'PS'},
	'Le palais des congrès':{'nom':'PC'}
};

 BUDGET = 60;
 TEMPS = 12;

//Distance entre 2 sites considérés comme proche:
NEARBY_DISTANCE = 1;
//matrice des distances entre les sites
var placeDistances = {
	"MR":{"distanceTo":{"PI":5, "SV":5, "MN":7, "JZ":21, "EC":9, "HC":7, "NP":1, "CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"PI":{"distanceTo":{"SV":5, "MN":7, "JZ":21, "EC":9, "HC":7, "NP":1, "CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"MN":{"distanceTo":{"JZ":21, "EC":9, "HC":7, "NP":1, "CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"JZ":{"distanceTo":{"EC":9, "HC":7, "NP":1, "CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"EC":{"distanceTo":{"HC":7, "NP":1, "CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"HC":{"distanceTo":{ "NP":1, "CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"NP":{"distanceTo":{"CA":7, "BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"CA":{"distanceTo":{"BS":1.2, "HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"BS":{"distanceTo":{"HH":12, "HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"HH":{"distanceTo":{"HD":2, "CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"HD":{"distanceTo":{"CH":1, "YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"CH":{"distanceTo":{"YH":2, "MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"YH":{"distanceTo":{"MH":1, "DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"MH":{"distanceTo":{"DP":4, "PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"DP":{"distanceTo":{"PH":3, "HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"PH":{"distanceTo":{"HM":4, "HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"HM":{"distanceTo":{"HF":6, "ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"HF":{"distanceTo":{"ND":2, "MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"ND":{"distanceTo":{"MV":5, "CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"MV":{"distanceTo":{"CT":4, "PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"CT":{"distanceTo":{"PS":2, "PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"PS":{"distanceTo":{"PC":9, "GF":2.2, "ME":6.3, "GM":9.1}},
	"PC":{"distanceTo":{"GF":2.2, "ME":6.3, "GM":9.1}},
	"GF":{"distanceTo":{"ME":6.3, "GM":9.1}},
	"ME":{"distanceTo":{"GM":9.1}},
};

