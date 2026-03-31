<?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /repositories/charleson-website/index.html#contact');
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
    header('Location: /repositories/charleson-website/index.html?contactStatus=success#contact');
    exit;
}

if ($name === '' || $contact === '' || $message === '') {
    header('Location: /repositories/charleson-website/index.html?contactStatus=invalid#contact');
    exit;
}

$to = 'admin@charlesoncomms.ng';
$subject = 'New Charleson Inquiry';
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
    header('Location: /repositories/charleson-website/index.html?contactStatus=success#contact');
    exit;
}

header('Location: /repositories/charleson-website/index.html?contactStatus=error#contact');
exit;
