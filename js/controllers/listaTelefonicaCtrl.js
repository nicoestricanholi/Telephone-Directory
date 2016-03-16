angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, $filter) {
$scope.app = "Lista Telefonica";
$scope.contatos = [];
$scope.operadoras = [];

var urlContatos = "http://localhost:3412/contatos",
	urlOperadoras = "http://localhost:3412/operadoras",
	urlCores = "http://localhost:3412/cores";

var carregarContatos = function () {
	$http.get(urlContatos).success(function (data, status) {
		$scope.contatos = data;
	});
};

var carregarOperadoras = function () {
	$http.get(urlOperadoras).success(function (data, status) {
		$scope.operadoras = data;
	});
};

var carregarCores = function () {
	$http.get(urlCores).success(function (data, status) {
		$scope.cores = data;
	});
};

$scope.adicionarContato = function (contato) {
	contato.data = new Date();
	$http.post(urlContatos, contato).success(function (data) {
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
		carregarContatos();
	});
};

$scope.apagarContatos = function (contatos) {
	$scope.contatos = contatos.filter(function (contato) {
		if (!contato.selecionado) return contato;
	});
};

$scope.isContatoSelecionado = function (contatos) {
	return contatos.some(function (contato) {
		return contato.selecionado;
	});
};

$scope.ordernarPor = function (campo) {
	$scope.criterioDeOrdenacao = campo;
	$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
};

carregarContatos();
carregarOperadoras();
carregarCores();
});