
function SignUp()
{    var inputs = document.getElementsByTagName("input");
    var checkbox = document.getElementsByClassName('form-check-input');
    var checkboxLabel = document.getElementsByClassName('form-check-label');
    var erreur = document.getElementById("valid");
    var formulaire = document.getElementById("formlr");
    var button = document.getElementById("yanis");
    var test = document.getElementById("Signup");
    var Boutons = document.getElementById("bton");
    const arobaze = /[@]/g;
    const miniscule = /[a-z]/g;
    const minuscule = /a-z||A-Z/g;
    const nameMail = /gmail|outlook|msn|yahoo|icloud|aol|live/g;
    const num = /[1-9]/g;
    const Ndomaine = /.fr|.com|.org/g;
    const point = /[.]/g;
    var verifMail = false;
    var verifPass = false;
    var verifbox = false;
    var verif = false;
    verifpass2 = false ;
    var mail = inputs[1];
    var password = inputs[2];
    var password2 = inputs[3];
    var status_id = 0 ;












    if (mail.value.match(miniscule)) //l'adresse doit comporter des miniscule
    {
        if (mail.value.match(arobaze)) //l'adresse doit comporter un @
        {
            if (mail.value.match(minuscule)) //l'adresse doit comporter des Nmail
            {
                if (mail.value.match(Ndomaine)) {
                    erreur.innerHTML = "";
                    mail.style.borderColor = "green";
                    verifMail = true;
                }
                else {
                    erreur.style.color = "red";
                    erreur.innerHTML = "Veuillez taper le nom de domaine ! ";
                }
            }
            else {
                erreur.style.color = "red";
                erreur.innerHTML = "Veuillez vérifier le mail ! ";
            }
        }
        else {
            erreur.style.color = "red";
            erreur.innerHTML = "Veuillez taper le @ ! ";
        }
    }

    else {
        mail.style.borderColor = "red";
        verifMail = false;
        erreur.style.color = "red";
        erreur.innerHTML = "Veuillez taper le mail ! ";
    }


    if (password.value.match(miniscule)) {
        if (password.value.match(num)) {
            password.style.borderColor = "green";
            verifpass2 = true;
        }
    }

    else {
        password.style.borderColor = "red";
        password2.style.borderColor = "red";
        verifpass2 = false ;
    }

    if (verifpass2 == true)
    {
        if (password.value == password2.value) {
            password2.style.borderColor = "green";
            verifPass = true;
        }
        else {
            password2.style.borderColor = "red";
            verifpass = false;
            erreur.style.color = "red";
            erreur.innerHTML = "Les mots de passe sont différents ! ";

        }
    }


    if (!checkbox[0].checked) {
        checkboxLabel[0].style.color = "red";
        verifbox = false ;
    } else {
        checkboxLabel[0].style.color = "green";
        verifbox = true ;
    }

    if (verifMail == true && verifPass == true && verifbox == true) {
        verif = true;



      var form= "email="+mail.value+"&password="+password.value+"&password2="; //On envoi les donnée des input au php

        $.ajax({
                url: "./assets/js/traitement.php",
                dataType : "JSON",
                data :  form,
                method: "GET",
                success:function(msg) {
                console.log(msg);
                    console.log(msg.messageAccount.status_id);

                    var statut_id = msg.messageAccount.status_id;
                    var reponse = msg.messageAccount;



                 /*   if (reponse == 1)
                    {console.log(reponse);
                        test.innerHTML = "";
                        test.style.fontSize = "100px";
                        test.innerHTML = "Bienvenue " + msg.messageAccount.email + ", nous sommes ravie de te revoir";
                    }
                    else if (reponse == 0)
                    {
                        erreur.style.color = "red";
                        erreur.style.fontSize = "20px";
                        erreur.innerHTML = "ERROR, le mail " + msg.messageAccount.email + " est déja utilisé";
                    }
                    else
                        alert("ALERTE");*/


                  switch (statut_id) {

                        case 0:
                            erreur.style.color = "red";
                            erreur.style.fontSize = "20px";
                            erreur.innerHTML = "ERROR, le mail " + reponse.email + " est déja utilisé";
                            break;
                      case 1:
                            test.innerHTML = "";
                            test.style.fontSize = "40px";
                            test.innerHTML = "Bienvenue " + reponse.email + ", nous sommes ravie de te revoir";
                            Boutons.style.display = "block";

                            initialisation();
                            break;
                    }

                }


            });
       //

    }
    else {
        verif = false;
        erreur.style.color = "red";
    }




}
var choix ;
function initialisation(choix) {
    // Objet representant une coordonnée
    if (choix == 1) {
        var latlng = new google.maps.LatLng(48.96158401424455, 2.548076270486082);
        var options = {
            center: latlng,
            zoom: 15,
        };
    }
    else if (choix == 2) {
        var latlng = new google.maps.LatLng(48.96178100623078, 2.510851345189964);
        var options = {
            center: latlng,
            zoom: 13.8,
        };
    }
    else if (choix == 3) {
        var latlng = new google.maps.LatLng(48.95867389954952, 2.548546097350723);
        var options = {
            center: latlng,
            zoom: 16.8,
        };
    }
    else
    {
        var latlng = new google.maps.LatLng(48.95901196804638, 2.547697153340051);
        var options = {
            center: latlng,
            zoom: 15,
        };
    }


    carte = new google.maps.Map(document.getElementById("carte"), options);
    $.ajax({
        url: "./assets/js/courses.json",
        method: "GET",
        dataType: "JSON",
        success: (mark) => {

            if (choix == 1) {
                console.log(mark[0]);

                for (let y = 0; y < mark[0].length; y++) {
                    markers = new google.maps.Marker({
                        position: { lat: mark[0][y].lat, lng: mark[0][y].lng },
                        map: carte,
                    });
                    const lignes = new google.maps.Polyline({
                        path: mark[0],
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    });
                    lignes.setMap(carte);
                }
            }

            if (choix == 2) {
                console.log(mark[1]);

                for (let y = 0; y < mark[1].length; y++) {
                    markers = new google.maps.Marker({
                        position: { lat: mark[1][y].lat, lng: mark[1][y].lng },
                        map: carte,
                    });
                    const lignes = new google.maps.Polyline({
                        path: mark[1],
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    });
                    lignes.setMap(carte);
                }
            }
            if (choix == 3) {
                console.log(mark[2]);

                for (let y = 0; y < mark[1].length; y++) {
                    markers = new google.maps.Marker({
                        position: { lat: mark[2][y].lat, lng: mark[2][y].lng },
                        map: carte,
                    });
                    const lignes = new google.maps.Polyline({
                        path: mark[2],
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    });
                    lignes.setMap(carte);
                }
            }
        }
    })
}
