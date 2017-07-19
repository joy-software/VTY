/**
 * Created by NDJAMA on 05/05/2016.
 */

var maCarte;
var zoneMarqueurs = new google.maps.LatLngBounds();
var tableauPref = [
    { lat:3.852419, lng: 11.513635, 'duree':1 , 'prix':2000 ,'nom':'Le monument de la reunification',appreciation:"5",img:"http://vty.comxa.com/_include/img/work/thumbs/image-01.jpg" },
    { lat:  3.873035, lng: 11.517555, 'duree':0.75 , 'prix':0 ,'nom':'La place de l\'independance',appreciation:"5",img:"http://vty.comxa.com/_include/img/work/thumbs/image-02.jpg" },
    { lat:3.854816, lng:11.510558, 'duree':0.5 , 'prix':0,'nom':'Le monument dedié aux soldats',appreciation:"3",img:"http://vty.comxa.com/_include/img/work/thumbs/image-03.jpg" },
    { lat:3.860623,  lng:11.515917,'duree':2 , 'prix':5000,'nom':'Le musée national',appreciation:"5",img:"http://vty.comxa.com/_include/img/work/thumbs/image-04.jpg" },
    { lat:3.859166, lng: 11.520299,'duree':0.5 , 'prix':0,'nom':'Statut de Charles Atangana',appreciation:"4",img:"http://vty.comxa.com/_include/img/work/thumbs/image-06.jpg" },
    { lat:3.914341, lng:11.50017499923706, 'duree':1 , 'prix':1500,'nom':'Benedictine Museum of Mont-Febe',appreciation:"3",img:"http://vty.comxa.com/_include/img/work/thumbs/image-05.jpg" },
    { lat:3.864439, lng: 11.518627, 'duree':1 , 'prix':2000,'nom':'Musée Blacktitude',appreciation:"3",img:"http://vty.comxa.com/_include/img/work/thumbs/image-07.jpg" },
    { lat:3.864793,  lng:11.487523,'duree':3 , 'prix':3000,'nom':'Parc National de la Mefou',appreciation:"4",img:"http://vty.comxa.com/_include/img/work/thumbs/image-08.jpg" },
    { lat:3.867816, lng: 11.514265,'duree':1 , 'prix':200,'nom':'Les cascades du Mfoundi',appreciation:"5",img:"http://vty.comxa.com/_include/img/work/thumbs/image-09.jpg" },
    { lat:3.871265, lng: 11.514466, 'duree':2 , 'prix':200,'nom':'Le Bois St-Anastasie',appreciation:"4",img:"http://vty.comxa.com/_include/img/work/thumbs/image-10.jpg" },
    { lat:3.863520, lng:  11.520848, 'duree':1 , 'prix':0,'nom':'La Cathedrale Notre Dame',appreciation:"3",img:"http://vty.comxa.com/_include/img/work/thumbs/image-12.jpg" },
    { lat:3.842321, lng: 11.507719, 'duree':1, 'prix':0,'nom':'La basilique Marie Reine des Apotres de Mvolye',appreciation:"3",img:"http://vty.comxa.com/_include/img/work/thumbs/image-11.jpg" },
    { lat:3.874247, lng: 11.512196,'duree': 2, 'prix':0,'nom':'Le palais polyvalent des sports',appreciation:"3",img:"http://vty.comxa.com/_include/img/work/thumbs/image-13.jpg" },
    { lat:3.890818, lng:  11.500193,'duree':3 , 'prix':0,'nom':'Le palais des congrès',appreciation:"4",img:"http://vty.comxa.com/_include/img/work/thumbs/image-14.jpg" }
];

var Nomsite =  [
    'Le monument de la reunification','La place de l\'independance','Le monument dedié aux soldats','Le musée national',
    'Statut de Charles Atangana','Benedictine Museum of Mont-Febe','Musée Blacktitude','Parc National de la Mefou','Les cascades du Mfoundi',
    'Le Bois St-Anastasie','La Cathedrale Notre Dame','La basilique Marie Reine des Apotres de Mvolye','Le palais polyvalent des sports','Le palais des congrès'];
tableauMarqueurs = [];

function initialiser(){

    var optionsCarte = {
        zoom: 15,
        center: new google.maps.LatLng( 3.863520 , 11.520848 ),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    maCarte = new google.maps.Map( document.getElementById("carte"), optionsCarte );
    for( var i = 0, I = tableauMarqueurs.length; i < I; i++ ) {
        ajouteMarqueur( tableauMarqueurs[i] );
    }
    maCarte.fitBounds( zoneMarqueurs );

    ajouteItineraire(tableauMarqueurs);
} // Fin initialiser

function initialiser2(){

    var optionsCarte = {
        zoom: 15,
        center: new google.maps.LatLng( 3.863520 , 11.520848 ),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    maCarte = new google.maps.Map( document.getElementById("carte2"), optionsCarte );
    for( var i = 0, I = tableauMarqueurs.length; i < I; i++ ) {
        ajouteMarqueur( tableauMarqueurs[i] );
    }
    maCarte.fitBounds( zoneMarqueurs );

    ajouteItineraire(tableauMarqueurs);
} // Fin initialiser


function ajouteMarqueur( latlng ) {
    var latitude = latlng.lat;
    var longitude = latlng.lng;
    var optionsMarqueur = {
        map: maCarte,
        position: new google.maps.LatLng( latitude, longitude ),
        title: latlng.nom
    };

    var marqueur = new google.maps.Marker( optionsMarqueur );
    zoneMarqueurs.extend( marqueur.getPosition() );
    var etoile = "";
    var et = parseInt(latlng.appreciation);

    for(var i=0;i<et;i++){
        etoile += "<span class=\" font-icon-stars\" aria-hidden=\"true\"></span>";
    }

    var contenuInfoBulle =
        '<img id="lettrineImage" src="'+latlng.img+'" style="width: 300px;height: 200px"/>' +
        '<div id="lettrineCaracteristique">'+
        '<b>'+latlng.nom+'</b><br/>' +
        '<b>Coût : </b>'+latlng.prix+' FCFA <br/>' +
        '<b>Durée : </b>'+latlng.duree+' Heure(s) <br/>'+
        '<b>Appreciation : </b>'+etoile+
        '</div>';

    var optionsInfoBulle = {
        content: contenuInfoBulle
    }
    var infoBulle = new google.maps.InfoWindow( optionsInfoBulle );
    google.maps.event.addListener(marqueur, 'click', function() {
        infoBulle.open(maCarte, marqueur);
    });



} // Fin fonction ajouterMarqueur

function ajouteItineraire(tableauSite){
    var taille = tableauSite.length;
    var services = [];
    var displays = [];

    for(var i=0;i<taille;i++){
        displays[i] = new google.maps.DirectionsRenderer();
        services[i] = new google.maps.DirectionsService();
        displays[i].setMap(maCarte);
    }

    for(var j=0;j<(taille-1);j++){
        calcRoute(tableauSite[j], tableauSite[j+1],services[j],displays[j]);
    }



}

function calcRoute(dep,end,directions_service,directions_display) {
    current_pos = new google.maps.LatLng(dep.lat,dep.lng);
    end_pos = new google.maps.LatLng(end.lat,end.lng)
    var request = {
        origin:current_pos,
        destination:end_pos,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directions_service.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directions_display.setDirections(result);
            /* directions_display.suppressMarkers = true;
             directions_display.setOptions({polylineOptions:{strokeColor: '#008000'}, preserveViewport: true});
             */
        }
    });

}
