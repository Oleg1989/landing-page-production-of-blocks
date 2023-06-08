<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$userName = $data['userName'];
$phoneNumber = $data['phoneNumber'];

// Контент письма
$title = 'Заявка з сайта HDblock'; // Название письма
$body = '<p>Ім`я: <strong>' . $userName . '</strong></p>' .
  '<p>Мобільний телефон: <strong>' . $phoneNumber . '</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'orderinfohdblock@gmail.com'; // Логин на почте
  $mail->Password   = 'kivpjkuaizbosydl'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('orderinfohdblock@gmail.com', 'Заявка з сайта HDblock'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('ivanishin9891@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Заявка відправленна успішно!');
} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo ('Заявка не була відправленна! Причина помилки: {$mail->ErrorInfo}');
}
