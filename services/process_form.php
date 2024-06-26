<?php

// Include PHPMailer classes
require "../vendor/autoload.php";
require "../vendor/PHPMailer/src/PHPMailer.php";
require "../vendor/PHPMailer/src/Exception.php";
require "../vendor/PHPMailer/src/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable("..");
$dotenv->load();

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$honeypot = $_POST['honeypot'] ?? '';

// Email Data
$envFilePath = '../.env';

// Parse the .env file
$envVariables = parse_ini_file($envFilePath);

// Retrieve environment variables
$username = $envVariables['EMAIL_USERNAME'] ?? null;
$password = $envVariables['EMAIL_PASSWORD'] ?? null;

// Initialize PHPMailer
$mail = new PHPMailer(true);

// Check for honeypot spam detection
if (!empty($honeypot)) {
    exit('Spam detected');
}

try {
    // SMTP configuration
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Set sender and recipient
    $mail->setFrom($email, $name); // Replace with sender's email address
    $mail->addAddress($username, "Throwaway"); // Replace with recipient's email address
    $mail->addReplyTo($email, $name);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Contact Form Submission';

    $name = htmlspecialchars($name, ENT_QUOTES);
    $email = htmlspecialchars($email, ENT_QUOTES);
    $message = htmlspecialchars($message, ENT_QUOTES);
    $mail->Body = nl2br("name: $name\nemail: $email\nmessage: $message"); 

    $mail->AltBody = 'This is the plain text version of the email body';

    $mail->AltBody = 'This is the plain text version of the email body';

    // Send email
    $mail->send();
    echo 'Message has been sent'; // Redirect to another HTML page if needed
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>