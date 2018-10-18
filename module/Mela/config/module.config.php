<?php
	namespace Mela;

	use Zend\Router\Http\Literal;
	use Zend\Router\Http\Segment;
	use Doctrine\ORM\Mapping\Driver\AnnotationDriver;

	return [

		// The following section is new and should be added to your file:
	     'router' => [
	         'routes' => [
	             'mela' => [
	                 'type'    => Segment::class,
	                 'options' => [
	                     'route' => '/mela[/:action[/:id]]',
	                     'constraints' => [
	                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
	                         'id'     => '[0-9]+',
	                     ],
	                     'defaults' => [
	                         'controller' => Controller\MelaController::class,
	                         'action'     => 'index',
	                     ],
	                 ],
	             ],
	         ],
	     ],
		'view_manager' => [
			'template_path_stack' => [
				'mela' => __DIR__ . '/../view',
			],
		],
	];
