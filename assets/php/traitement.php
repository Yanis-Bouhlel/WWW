<?php

$mail=$_GET["email"];
$pass=$_GET["password"];

$method=  $_GET["method"];




//var_dump($obj[0]);
if ($method == "SignIn") {
    $file = '../js/accounts.json';
    $data = file_get_contents($file);
    $obj = json_decode($data);
    $status_id = 0 ;
    for ($i = 0; $i < sizeof($obj); $i++) {
        if ($mail == $obj[$i]->email) {
            $status_id = 0;
            if ($pass == $obj[$i]->password) {
                $status_id = 1;

                break;
            }
        }

    }
    $myarray = array("messageAccount" => array("status_id" => $status_id, "email" => "$mail"));
    echo json_encode($myarray);
}

//var_dump($method);

      if ($method == "SignUp")
      {

          $data_results = file_get_contents('../js/accounts.json');
          $tempArray = json_decode($data_results);
          $status_id = 0 ;
          for ($i = 0 ; $i < sizeof($tempArray) ; $i++)
          {
              if ($mail == $tempArray[$i]->email)
              {
                  if ($pass == $tempArray[$i]->password)
                  {
                      $status_id = 1 ;
                      $myarray = array("messageAccount" => array("status_id" => $status_id, "email" => "$mail"));
                      echo json_encode($myarray);
                      break ;
                  }
              }
      }


          if ($status_id == 0)
          {

              $data_results = file_get_contents('../js/accounts.json');
              $tempArray = json_decode($data_results);

              $additionalArray = array("email"=>$mail,"password"=>"$pass");

              $tempArray[] = $additionalArray ;
              $jsonData = json_encode($tempArray);
              file_put_contents('../js/accounts.json', $jsonData);
              $myarray = array("messageAccount" => array("status_id" => $status_id, "email" => "$mail"));
              echo json_encode($myarray);

          }



  }

/*
$additionalArray = array(
    'id' => "is",
    'title' => 'title',
    'content' => 'title'
);

//open or read json data
$data_results = file_get_contents('results.json');
$tempArray = json_decode($data_results);

//append additional json to json file

$tempArray[] = $additionalArray ;
$jsonData = json_encode($tempArray);

file_put_contents('results.json', $jsonData);*/


   // $tableau=array($mail,$pass);

        $header="MIME-Version: 1-0\r\n";
        $header.='From:"webminiprojet.com"<support@webminiprojet.com>'."\n";
        $header.='Content-Type:text/html; charset="utf-8"'."\n";
        $header.='Content-Transfer-Encoding: 8bit';
         $msg="<html>
               <head>
               </head>
               <body>
                   <h1>Vérification !!!<h1/>
               </body>
               </html>";
        mail($mail,"Vérification",$msg, $header);   //envoie du mail a l'adresse enregistrer

?>

