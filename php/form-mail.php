<?php
$mailto      =  'enzavonmetatronics@gmail.com';
$mailFrom    =  'Form-Mailer PHP-Script';
$mailSubject =  'Feedback vom PHP-Formular';
$returnPage  =  'danke.html';
$returnError =  'fehler.html';
$mailContent =  '';

if(isset($_POST)) {
	foreach($_POST as $name => $value) {
		$mailContent .= $name . ": " . $value . "\n";
	}
}

$mailSent = mail($mailto, $mailSubject, $mailContent, "From: " . $mailFrom);

if($mailSent === TRUE) {
	header("Location: " . $returnPage);
}
else {
	header("Location: " . $returnError);
}

exit();
?>