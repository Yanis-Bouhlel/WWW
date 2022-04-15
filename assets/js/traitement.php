<?php
            $mail = $_GET["email"];
            $pass = $_GET["password"];

            $status_id = 0 ;


            // chemin d'accès à votre fichier JSON
            $file = 'account.json';
            // mettre le contenu du fichier dans une variable
            $data = file_get_contents($file);
            // décoder le flux JSON
            $obj = json_decode($data);
            // accéder à l'élément approprié
            for ($i=0;$i<3;$i++)
            {
                if ($mail == $obj[$i]->email)
                {
                    if ($pass == $obj[$i]-> password )
                    {
                        $status_id = 1 ;
                   }
                    else
                    {
                        $status_id = 0 ;
                    }
                }
            }

            $myarray = array("messageAccount"=>array("status_id"=>$status_id,"email"=>"$mail"));
            echo json_encode($myarray);



/* Header du mail */


//Le mail ne s'envoie pas a cause d'une erreur du serveur !!

/*$header="MIME-Version: 1-0\r\n";
$header.='From:"webminiprojet.com"<support@webminiprojet.com>'."\n";
$header.='Content-Type:text/html; charset="utf-8"'."\n";
$header.='Content-Transfer-Encoding: 8bit';
//message par mail en HTML
$msg="<html>
          <head>
          </head>
          <body>
              <h1>Vérification !!!<h1/>
          </body>
          </html>";
mail($mail,"Vérification",$msg, $header);//envoie du mail a l'adresse enregistrer*/

?>