## Setup Instructions

### Installation

1. **Install dependencies:**

    ```sh
    composer install
    composer require vlucas/phpdotenv
    ```

2. **Set up environment variables:**

    1. Rename the `.env.example` file to `.env`:

        ```sh
        cp .env.example .env
        ```

    2. Open the `.env` file in your preferred text editor and replace the placeholder values with your actual environment variables:

        ```env
        EMAIL_USERNAME=your_actual_email@example.com
        EMAIL_PASSWORD=your_actual_password
        ```

    3. Update your `process_form.php` to load the environment variables:
       
        ```sh
        require "../vendor/autoload.php";
        
        use Dotenv\Dotenv;
        
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        ```

3. **Install PHP Mailer:**

    1. Add PHPMailer to your project using Composer:

        ```sh
        composer require phpmailer/phpmailer
        ```
       
    3. Update your `process_form.php` to include PHPMailer::

        ```sh
        require "../vendor/autoload.php";
        require "./PHPMailer/src/PHPMailer.php";
        require "./PHPMailer/src/Exception.php";
        require "./PHPMailer/src/SMTP.php";
        
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;
        use Dotenv\Dotenv;
        
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $message = $_POST['message'] ?? '';
        $honeypot = $_POST['honeypot'] ?? '';
        
        $username = getenv('EMAIL_USERNAME');
        $password = getenv('EMAIL_PASSWORD');
        
        $mail = new PHPMailer(true);
        
        if (!empty($honeypot)) {
            exit('Spam detected');
        }
        
        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $username;
            $mail->Password = $password;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;
        
            // Set sender and recipient
            $mail->setFrom($email, $name); // User's email and name
            $mail->addAddress($username, "Throwaway"); // Your email
            $mail->addReplyTo($email, $name);
        
            // Email content
            $mail->isHTML(true);
            $mail->Subject = 'Contact Form Submission';
        
            $name = htmlspecialchars($name, ENT_QUOTES);
            $email = htmlspecialchars($email, ENT_QUOTES);
            $message = htmlspecialchars($message, ENT_QUOTES);
            $mail->Body = nl2br("name: $name\nemail: $email\nmessage: $message");
        
            $mail->AltBody = 'This is the plain text version of the email body';
        
            // Send email
            $mail->send();
            echo 'Message has been sent'; // Redirect to another HTML page if needed
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        ```    
