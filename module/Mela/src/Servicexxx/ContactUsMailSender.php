<?php
namespace Leadswork\Service;

use Zend\Mail\Message;
use Zend\Mail\Transport\Sendmail;

use Zend\Mime\Message as MimeMessage;
use Zend\Mime\Part as MimePart;

use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;

// This class is used to deliver an E-mail message to recipient.
class ContactUsMailSender
{
    public function sendStayInformedMail($request)
    {
        $name = $request->getPost()['name'];
        $email = $request->getPost()['email'];

        $request->getPost()['name'] = '';
        $request->getPost()['email'] = '';

        $file_path = "http://dev.privateeyeservice.co.uk/privateeye/public/email-tmp/customer-new-letter-notice-admin.html";

        $doc = new \DOMDocument();
        $email_contents = $doc->loadHTMLFile($file_path);


        if ($email_contents) {

            $doc->getElementById('name')->nodeValue = $name;
            $doc->getElementById('email')->nodeValue =  $email;
            $doc->getElementById('date')->nodeValue =  date("d/m/Y H:i:s", strtotime(date('Y-m-d H:i:s')));
            $message = $doc->saveHTML();
        }else {
            throw new \Exception('Email template could not be loaded to the DOMDocument User/.../MailSender.php');
        }

        // Setup SMTP transport using LOGIN authentication

        $transport = new SmtpTransport();
        $options   = new SmtpOptions([
            'host'              => 'mailbutler.co.uk',
            'connection_class'  => 'login',
            'connection_config' => [
                'ssl'       => 'tls',
                'username' => 'pes_patrick',
                'password' => '88ee-a72230572586'
            ],
            'port' => 587,
        ]);

        try {

          $html = new MimePart($message);
          $html->type = "text/html";

          // Create E-mail message
          $mail = new Message();
          $mail->setFrom('support@leadswork.co.uk', 'LeadsWork');
          $mail->addBcc('support@leadswork.co.uk');
          $mail->setSubject('LeadsWork new letter signup');

          $body = new MimeMessage();
          $body->addPart($html);

          $mail->setBody($body);

          // Send E-mail message
          $transport->setOptions($options);
          $transport->send($mail);

        } catch(\Exception $e) {
              throw new \Exception('Something went wrong, confirmation email could not be sent');
        }
    }
    // Sends the mail message.
    public function sendContactSupportMail($form_date)
    {
      $file_path = "http://dev.privateeyeservice.co.uk/privateeye/public/email-tmp/contact-leadswork-admin.html";

      $doc = new \DOMDocument();
      $email_contents = $doc->loadHTMLFile($file_path);

      if ($email_contents) {

          $doc->getElementById('message')->nodeValue = $form_date->message;
          $doc->getElementById('name')->nodeValue = $form_date->name;
          $doc->getElementById('phone')->nodeValue = $form_date->phone;
          $doc->getElementById('email')->nodeValue =  $form_date->email;
          $doc->getElementById('date')->nodeValue =  date("d/m/Y H:i:s", strtotime(date('Y-m-d H:i:s')));

          (isset($doc->getElementsByTagName('a')->item(2)->attributes->getNamedItem("href")->value)) ? $doc->getElementsByTagName('a')->item(2)->attributes->getNamedItem("href")->value = 'mailto:'.str_replace(' ','',$form_date->email) : '' ; // url for email

          (isset($doc->getElementsByTagName('a')->item(3)->attributes->getNamedItem("href")->value)) ? $doc->getElementsByTagName('a')->item(3)->attributes->getNamedItem("href")->value = 'tel:'.str_replace(' ','',$form_date->phone) : '' ; // url for phone


          $message = $doc->saveHTML();
      }else {
          throw new \Exception('Email template could not be loaded to the DOMDocument User/.../MailSender.php');
      }

      // Setup SMTP transport using LOGIN authentication

      $transport = new SmtpTransport();
      $options   = new SmtpOptions([
          'host'              => 'mailbutler.co.uk',
          'connection_class'  => 'login',
          'connection_config' => [
              'ssl'       => 'tls',
              'username' => 'pes_patrick',
              'password' => '88ee-a72230572586'
          ],
          'port' => 587,
      ]);

      try {

        $html = new MimePart($message);
        $html->type = "text/html";

        // Create E-mail message
        $mail = new Message();
        $mail->setFrom('support@leadswork.co.uk', 'LeadsWork');
        $mail->addBcc('support@leadswork.co.uk');
        $mail->setSubject('LeadsWork - Contact us');

        $body = new MimeMessage();
        $body->addPart($html);

        $mail->setBody($body);

        // Send E-mail message
        $transport->setOptions($options);
        $transport->send($mail);

      } catch(\Exception $e) {
            throw new \Exception('Something went wrong, confirmation email could not be sent');
      }
    }

}
