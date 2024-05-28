## Setup Instructions

### Prerequisites

- PHP >= 7.2
- Composer

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

    3. Add requirements to `process_form.php`:
       
       ```sh
       require "../vendor/autoload.php";

       use Dotenv\Dotenv;
       ```

3. **Install PHP Mailer:**

    1. Download PHPMailer:

        ```sh
        https://github.com/PHPMailer/PHPMailer
        ```

    2. Unzip it to `services/` :
       
    3. Add requirements to `process_form.php`:

       ```sh
       require "./PHPMailer/src/PHPMailer.php";
       require "./PHPMailer/src/Exception.php";
       require "./PHPMailer/src/SMTP.php";

       use PHPMailer\PHPMailer\PHPMailer;
       use PHPMailer\PHPMailer\Exception;
       ```

   
