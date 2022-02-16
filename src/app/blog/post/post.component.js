import './post.component.scss';

export const PostComponent = {
	options: {
		url: '/blog/:post_id',
		state: 'post',
		template: require("./post.component.html"),
		controller: PostController.name,
		controllerAs: "vm",
		authenticate: false,
		resolve:{
			data:["$q", "$stateParams", "HttpService", function($q, $stateParams, HttpService){

			}]
		}
	},
	controller: ["$scope", "$rootScope", "$location", "SeoService", "$stateParams", "$sce", "data", "HttpService", "swangular", PostController]
}

function PostController($scope, $rootScope, $location, SeoService, $stateParams, $sce, data, HttpService, swangular) {
	var vm = this;
	var appSettings = $rootScope.getCurrentEnvironment();

	$scope.btn_disabled = false;
	$scope.coment_data = {
		comentario: '',
		nome: localStorage.getItem('com_nome') || '',
		email: localStorage.getItem('com_email') || '',
		site: '',
		publicacao_id: 0
	}

	$scope.comments = [];

	const url = appSettings.STORAGE_URL;

	HttpService.get("/publicacoes/get-post/" + location.pathname.split('/')[2], {}).then(function (resp) {

		$scope.post = resp.data.data.post_details;
		$scope.others = resp.data.data.others;
		$scope.post.cover = url + resp.data.data.post_details.capa;
		$scope.coment_data.publicacao_id = $scope.post.id;

		$scope.shareLinks = {
			facebook: `https://www.facebook.com/sharer.php?u=${location.href}`,
			twitter: `https://twitter.com/share?&text=${encodeURI($scope.post.titulo)}&url=${location.href}`,
			pinterest: `https://pinterest.com/pin/create/bookmarklet/?url=${location.href}&media=${$scope.post.cover}`
		}

		for (var i in resp.data.data.others) {
			const e = document.createElement('div');
			e.innerHTML = resp.data.data.others[i].conteudo;
			resp.data.data.others[i].conteudo = e.innerText;

			resp.data.data.others[i].cover = url + resp.data.data.others[i].capa;
		}
		$scope.others = resp.data.data.others;

		$scope.saveData = false;
		document.getElementById('conteudo').innerHTML += $scope.post.conteudo;
		getComments();
	})

	$scope.postComent = function() {
		if(!$scope.btn_disabled) {
			$scope.btn_disabled = true;
			if ($scope.saveData) {
				localStorage.setItem('com_nome', $scope.coment_data.nome);
				localStorage.setItem('com_email', $scope.coment_data.email);
			}
			HttpService.post("/comentariospublicacao/post-coment/", $scope.coment_data).then(function (resp) {
				getComments()
				$scope.btn_disabled = false;
				swangular.swal(
					'Sucesso!',
					'Seu comentário foi enviada com sucesso!',
					'success'
				)
			});
		}
	}

	function getComments() {
		HttpService.get("/comentariospublicacao/get-coments/" + $scope.post.id, {}).then(function (resp) {

			$scope.comments = resp.data.data;
			// $scope.post.cover = url + resp.data.data.capa;
			// $scope.coment_data.publicacao_id = $scope.post.id;
			// document.getElementById('conteudo').innerHTML = $scope.post.conteudo;
		})
	}

}
