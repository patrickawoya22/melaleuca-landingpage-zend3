<?php
namespace Mela\Form;

use Zend\Form\Form;

class ContactUsForm extends Form
{
    public function __construct($name = null)
    {
        // We will ignore the name provided to the constructor
        parent::__construct('usr_contact');

        $this->add([ // full name
            'name' => 'name',
            'type' => 'text',
        ]);
        $this->add([
            'name' => 'email',
            'type' => 'text',
        ]);
        $this->add([
            'name' => 'phone',
            'type' => 'text',
            //'options' => [
            //    'label' => 'Title',
            //],
        ]);
        $this->add([
            'name' => 'message',
            'type' => 'textarea',
        ]);
        $this->add([
            'name' => 'submit',
            'type' => 'submit',
            'attributes' => [
                'value' => 'Submit Form',
            ],
        ]);
    }
}
