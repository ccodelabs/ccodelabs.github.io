<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'src/PHPMailer.php';
require 'src/Exception.php';
require 'src/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->SetLanguage("pt", 'language/');

// Get and define all POST data received
$dataPOST = $_POST;

try {
    //Server settings
    $mail->SMTPDebug = 1;                                       // Enable verbose debug output
    $mail->isSMTP(true);                                            // Set mailer to use SMTP
    $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
    );
    $mail->Host       = 'tls://smtp.gmail.com';                       // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'maseutestes@gmail.com';                // SMTP username
    $mail->Password   = 'metin2bustos';                         // SMTP password
    $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
    $mail->Port       = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($dataPOST['email'], $dataPOST['name']);
    $mail->addAddress('maseutestes@gmail.com', 'CCode');     // Add a recipient
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    // Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $dataPOST['subject'];
    $mail->Body    = 'Hello CCode,<br><br>'.$dataPOST['message'].'<br><br>Thanks in advance!,<br><b>'.$dataPOST['name'].'</b>';

    //send the message, check for errors
    if (!$mail->send()) { 
        $result = array('status'=>"error", 'message'=>"Mailer Error: ".$mail->ErrorInfo);//
        echo json_encode($result);
    } else {
        $result = array('status'=>"success", 'message'=>"Message sent.");
        echo json_encode($result);
    }
    //echo 'Message has been sent';
} catch (Exception $e) {
    //echo $e;
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
