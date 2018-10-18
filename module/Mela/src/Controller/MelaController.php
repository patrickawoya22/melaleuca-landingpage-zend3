<?php

	namespace Mela\Controller;

	// Add the following import statements at the top of the file:
	//use Mela\Form\ContactUsForm;
//	use Mela\Model\ContactUs;
//	use Mela\Service\ContactUsMailSender;

	// Add the following import:
	use Mela\Model\ContactUsTable;
	use Zend\Mvc\Controller\AbstractActionController;
	use Zend\View\Model\ViewModel;
	use Zend\Mvc\MvcEvent;


	class MelaController extends AbstractActionController
	{
		// Add this property:
		private $table;
		// Add this constructor:
      	public function __construct(ContactUsTable $table)
      	{
			session_start();
        	$this->table = $table;
      	}
		public function indexAction(){
			$request = $this->getRequest();
			if (!empty($request->getQuery()->fm) || !empty($request->getQuery()->lm) || !empty($request->getQuery()->em) || !empty($request->getQuery()->mo)) {
				$_SESSION['first_name'] = $request->getQuery()->fm;
				$_SESSION['last_name'] = $request->getQuery()->lm;
				$_SESSION['email'] = $request->getQuery()->em;
				$_SESSION['mobile'] = $request->getQuery()->mo;
				return $this->redirect()->toRoute('home');
			}
		}
	}
