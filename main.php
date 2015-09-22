<?php
   if (isset($_REQUEST["urlToGrab"])) {
      $url = $_REQUEST["urlToGrab"];
      $domain = file_get_contents($url);
      echo $domain;
   }