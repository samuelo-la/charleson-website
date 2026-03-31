<?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#contact');
    exit;
}

function clean_input(string $value): string
{
    return trim(filter_var($value, FILTER_SANITIZE_FULL_SPECIAL_CHARS));
}

$name = clean_input($_POST['name'] ?? '');
$contact = clean_input($_POST['contact'] ?? '');
$message = clean_input($_POST['message'] ?? '');
$honeypot = trim($_POST['company'] ?? '');

if ($honeypot !== '') {
    // Treat bot submissions as successful to avoid revealing anti-spam checks.
    header('Location: thank-you.html');
    exit;
}

if ($name === '' || $contact === '' || $message === '') {
    http_response_code(400);
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Message Not Sent</title></head><body style="font-family: Arial, sans-serif; padding: 2rem;"><h1>Message Not Sent</h1><p>Please fill in all required fields and try again.</p><p><a href="index.html#contact">Back to contact form</a></p></body></html>';
    exit;
}

$to = 'admin@charlesoncomms.ng';
$subject = 'New Charleson Website Inquiry';
$body = "You have received a new inquiry from the Charleson website.\n\n";
$body .= "Name: {$name}\n";
$body .= "Email/Phone: {$contact}\n\n";
$body .= "Message:\n{$message}\n";

$headers = [
    'From: no-reply@charlesoncomms.ng',
    'Reply-To: admin@charlesoncomms.ng',
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    header('Location: thank-you.html');
    exit;
}

http_response_code(500);
echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Temporary Error</title></head><body style="font-family: Arial, sans-serif; padding: 2rem;"><h1>We could not send your message right now.</h1><p>Please try again shortly, email admin@charlesoncomms.ng, or use WhatsApp.</p><p><a href="index.html#contact">Back to contact form</a></p></body></html>';
