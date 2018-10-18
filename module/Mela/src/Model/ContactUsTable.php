<?php
namespace Mela\Model;

require 'vendor/autoload.php';

use RuntimeException;
use Zend\Db\TableGateway\TableGatewayInterface;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Insert;
use Zend\Db\Sql\Sql;
//use User\Service\MailSender;
//use Zend\Crypt\Password\Bcrypt;
use Zend\Validator\Ip;


class ContactUsTable
{
    private $tableGateway;

    public function __construct(TableGatewayInterface $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function fetchAll()
    {
        return $this->tableGateway->select();
    }

    public function addSource($root){

        $source = $this->getSource($root)['source_name'];
        $myip = $this->getMyIpAddress();

    if (!empty($source)/* && $myip != '51.148.65.164'*/){
            $adapter = $this->tableGateway->getAdapter();
            $otherTable = new \Zend\Db\TableGateway\TableGateway('traffic_tracking', $adapter);

            $data = [
                'root'  => $source,
                'ip_address'  => $myip,
            ];
            $otherTable->insert($data);
        }
    }
    public function getSource($source_code){

        $adapter = $this->tableGateway->getAdapter();
        $sql = new Sql($adapter);
        $select = new Select();

        $select->from(array('source_map'=>'source_map'), array('id', 'source_name','source_code','date'))->where("source_code = '$source_code'")->offset(0)->limit(1);

        $statement = $sql->prepareStatementForSqlObject($select);
        $result    = $statement->execute();
        return $result->current();
    }
    public function saveContact(ContactUs $user) // passing Model/Mela.php class as object
    {
        $data = [
            'name' => $user->name, //full name
            'email' => $user->email,
            'phone' => $user->phone,
            'message' => $user->message,
        ];
            $this->tableGateway->insert($data);
            return;
    }

    public function getMyIpAddress(){
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if(filter_var($client, FILTER_VALIDATE_IP))
        {
            $ip = $client;
        }
        elseif(filter_var($forward, FILTER_VALIDATE_IP))
        {
            $ip = $forward;
        }
        else
        {
            $ip = $remote;
        }
        return ($this->isIpAddress($ip))?$ip:'';
    }
    public function isIpAddress($ipAddress){
        //https://olegkrivtsov.github.io/using-zend-framework-3-book/html/en/Checking_Input_Data_with_Validators/Validator_Usage_Examples.html
        // Create Ip validator.
        $validator = new Ip();

        // Configure the validator.
        $validator->setOptions([
            'allowipv4'      => true,  // Allow IPv4 addresses.
            'allowipv6'      => true,  // Allow IPv6 addresses.
            'allowipvfuture' => false, // Allow IPvFuture addresses.
            'allowliteral'   => true,  // Allow IP addresses in literal format.
        ]);

        // Check if input value is a valid IP address (IPv4).

        return $validator->isValid($ipAddress); // Returns true or false
    }

}
