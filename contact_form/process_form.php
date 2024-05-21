<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require ".\PHPMailer\src\PHPMailer.php";
require ".\PHPMailer\src\Exception.php";
require ".\PHPMailer\src\SMTP.php";


$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0;                    
    $mail->isSMTP();                    
    $mail->Host       = 'smtp.gmail.com';    
    $mail->SMTPAuth   = true;             
    
    // trying to implement .env file to secure the info
    $mail->Username   = // company gmail;
    $mail->Password   = // company password (has to be passkey);     
    $mail->SMTPSecure = 'tls';           
    $mail->Port       = 587;             

    $mail->setFrom("your_email@example.com", $name);
    $mail->addAddress('to_email@example.com', 'Recipient Name');   
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);             
    $mail->Subject = 'Contact Form';
    $mail->Body    = // format this to showcase the form in gmail
    $mail->AltBody = 'This is the plain text version of the email body';

    $mail->send();
    echo 'Message has been sent'; // redirect to another html if a design is needed
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>