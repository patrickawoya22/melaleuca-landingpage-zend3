<?php

	namespace Mela;

	// Add these import statements:
	use Zend\Db\Adapter\AdapterInterface;
	use Zend\Db\Adapter\Adapter; // foreign
	use Zend\Db\ResultSet\ResultSet;
	use Zend\Db\TableGateway\TableGateway;
	use Zend\ModuleManager\Feature\ConfigProviderInterface;

	class Module implements ConfigProviderInterface
	{
		public function getConfig()
		{
			return include __DIR__ . '/../config/module.config.php';
		}

		// Add this method:
	  public function getServiceConfig()
	  {
			return [
				 'factories' => [
					  Model\MelaTable::class => function($container) {
							$tableGateway = $container->get(Model\MelaTableGateway::class);
							return new Model\ContactUsTable($tableGateway);
					  },
					  Model\MelaTableGateway::class => function ($container) {
							$dbAdapter = $container->get(AdapterInterface::class);
							$resultSetPrototype = new ResultSet();
							$resultSetPrototype->setArrayObjectPrototype(new Model\ContactUs());
							return new TableGateway('traffic_tracking', $dbAdapter, null, $resultSetPrototype);//connecting to BD table
					  },
				 ],
			];
	  }

		public function getControllerConfig()
		{
			 return [
				  'factories' => [
						Controller\MelaController::class => function($container) {
							 return new Controller\MelaController(
								  $container->get(Model\MelaTable::class)
							 );
						},
				  ],
			 ];
		}
	}
