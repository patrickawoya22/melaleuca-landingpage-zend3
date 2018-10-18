<?php

namespace Mela\Model;

// Add the following import statements:
use DomainException;
use Zend\Filter\StringTrim;
use Zend\Filter\StripTags;
use Zend\Filter\ToInt;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;
use Zend\Validator\StringLength;

class ContactUs // Class maps DB table fields. later passed to table function as object
{
    public $name; // BD fields / Form valuables
    public $email;
    public $phone;
    public $message;

    // Add this property:
   private $inputFilter;

    public function exchangeArray(array $data) // exchangeArray creats bridge between actual form fields and BD fields
    {
        $this->name = !empty($data['name']) ? $data['name'] : null; // getting form fields values
        $this->email = !empty($data['email']) ? $data['email'] : null;
        $this->phone = !empty($data['phone']) ? $data['phone'] : null;
        $this->message = !empty($data['message']) ? $data['message'] : null;
    }

    /* Add the following methods: */

    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new DomainException(sprintf(
            '%s does not allow injection of an alternate input filter',
            __CLASS__
        ));
    }

    public function getInputFilter()
    {
        if ($this->inputFilter) {
            return $this->inputFilter;
        }

        $inputFilter = new InputFilter();

        $inputFilter->add([
            'name' => 'name',
            'required' => true,
            'filters' => [
                ['name' => StripTags::class],
                ['name' => StringTrim::class],
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'encoding' => 'UTF-8',
                        'min' => 1,
                        'max' => 250,
                    ],
                ],
            ],
        ]);

        $inputFilter->add([
            'name' => 'email',
            'required' => true,
            'filters' => [
                ['name' => StripTags::class],
                ['name' => StringTrim::class],
            ],
            'validators' => [
                [
                    'name' => 'EmailAddress',
                    'options' => [
                        'allow' => \Zend\Validator\Hostname::ALLOW_DNS,
                        'useMxCheck' => false,
                        'useDeepMxCheck' => false,
                    ],
                ],
            ],
        ]);

        $inputFilter->add([
            'name' => 'phone',
            'required' => true,
            'filters' => [
                ['name' => StripTags::class],
                ['name' => StringTrim::class],
            ],
            'validators' => [
                [
                  'name' => 'Callback',
                        'options' => [
                         'callback' => [$this, 'validatePhone'],
                         'callbackOptions' => [
                                'format' => 'mobile'
                            ]
                        ]
                ]
            ]
        ]);

        $inputFilter->add([
            'name' => 'message',
            'required' => true,
            'filters' => [
                ['name' => StripTags::class],
                ['name' => StringTrim::class],
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'encoding' => 'UTF-8',
                        'min' => 1,
                        'max' => 2000,
                    ],
                ],
            ],
        ]);

        $this->inputFilter = $inputFilter;
        return $this->inputFilter;
    }

    // Custom validator for a phone number.
    public function validatePhone($value, $context, $format)
    {
        $value = str_replace(' ','',$value);
      // Determine the correct length and pattern of the phone number,
      // depending on the format.
      if($format == 'mobile') {
        $correctLength = 11;
        $pattern = '/^07[0123456789]{1}[0-9]{8}/';
      } else { // 'local'
        $correctLength = 8;
        $pattern = '/^\d{3}-\d{4}$/';
      }
      // Check phone number length.
      if(strlen($value)!=$correctLength)
        return false;


      // Check if the value matches the pattern.
      $matchCount = preg_match($pattern, $value);

      //ping to see if the number is active
      if($this->pingMobile($value)){
          return false;
      }elseif ($value=='07446832123') {
        return false;
      }

      return ($matchCount!=0)?true:false;
    }

    public function pingMobile($mobile){
        /*$url = 'https://my.engine-mobile.co.uk/check_mobile.cgi?mobile='.$mobile;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl,CURLOPT_TIMEOUT,3000);
        curl_setopt($curl,CURLOPT_HEADER,true); //optional;
        curl_setopt($curl,CURLOPT_NOBODY,true); // remove body
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);

        //$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_exec($curl);

        $httpCode = curl_getinfo($curl);

        echo '<pre>';
        //print_r($httpCode);
        echo '</pre>';

        curl_close($curl);*/
        //die('end curl');
        return false;
    }
    // Add the following method:
   public function getArrayCopy()
   {
       return [
           'first_name' => $this->first_name,
           'last_name' => $this->last_name,
           'email' => $this->email,
           'password' => $this->password,
       ];
   }
}
