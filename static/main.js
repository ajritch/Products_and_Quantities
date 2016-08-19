var myAppModule = angular.module('myApp', []);

//products factory
myAppModule.factory('productFactory', function() {
	var products = [
		{name: 'computer', price: 1499.99, quantity: 45},
		{name: 'water bottle', price: 7.99, quantity: 34},
		{name: 'fig bar', price: 0.99, quantity: 12}
	];
	var factory = {};

	//get all products
	factory.index = function(callback) {
		callback(products);
	}

	//delete product
	factory.delete = function(product, callback) {
		products.splice(products.indexOf(product), 1);
		callback(products);
	}

	//add product
	factory.add = function(product, callback) {
		//only add if price is a number
		if (product.price && Number(parseFloat(product.price)) == product.price) {
			product.price = parseFloat(product.price);
			products.push(product);
			callback(products);
		}
	}

	//buy product (decrease quantity)
	factory.buy = function(product, callback) {
		if (products[products.indexOf(product)].quantity > 0) {
			products[products.indexOf(product)].quantity--;
			callback(products);
		}
	}

	return factory;
});

//products controller
myAppModule.controller('productsController', function($scope, productFactory) {

	//initialize empty products array and new product object
	$scope.products = [];
	$scope.product = {quantity: 50};

	//use this as a callback
	function setProducts(data) {
		$scope.products = data;
		$scope.product = {quantity: 50};
	}

	//get all products from factory
	productFactory.index(setProducts);

	//delete product
	$scope.delete = function(product) {
		productFactory.delete(product, setProducts)
	}

	//add product
	$scope.add = function() {
		productFactory.add($scope.product, setProducts);
	}
});

//quantities controller
myAppModule.controller('quantitiesController', function($scope, productFactory) {

	$scope.products = [];
	function setProducts(data) {
		$scope.products = data;
	}

	//get all products from factory
	productFactory.index(setProducts);

	//buy product
	$scope.buy = function(product) {
		productFactory.buy(product, setProducts);
	}

})