<?php
    echo "intruder alert!!! why you sniffing around my files <br> IntruderBot: You will now be punted back to the homepage in <span id='timeout'>5</span> sec. <script>setTimeout(function(){document.location='http://xiaoyu.cloudapp.net'}, 5000); var s = 4; setInterval(function(){document.getElementById('timeout').innerHTML = s + ''; s--;}, 1000)</script>";
    if($_SERVER["REQUEST_METHOD"] === "POST"){
	   $to = "yin530@gmail.com";
	   $subject = "Email from: [".$_POST["name"]."]";
	   $message = $_POST["message"];
	   $header = "From: ".$_POST['email']." \r\n";
	   $retval = mail ($to,$subject,$message,$header);
	   if( $retval == true )  
	   {
		  echo "<script>document.location='http://xiaoyu.cloudapp.net'</script>";
	   }
	   else
	   {
		  echo "Message could not be sent...";
	   }
    }
?>