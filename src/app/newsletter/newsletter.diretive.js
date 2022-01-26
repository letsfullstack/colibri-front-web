export const NewsDiretive = {
	options: function () {
		return {
			restrict: 'E',
			template: require("./newsletter.diretive.html"),
			scope: {},
			controller: ["$scope", "HttpService", "swangular", NewsController],
			controllerAs: "vm",
			bindToController: true
		}
	},
	element: "newsDiretive"
}

function NewsController($scope, HttpService, swangular) {
	var vm = this;

	vm.subscribe = function () {
		if(!vm.email){
			swangular.swal({
				title: 'Atenção',
				text: 'Informe um e-mail para continuar.',
				icon: 'success',
				confirmButtonColor: '#22222D',
				timer: 2500
			});
			
			return false;
		}
		HttpService.post("/newsletters/subscribe/", {email: vm.email}, {}).then(function(resp){
			if(resp.data.status){
				swangular.swal({
					title: 'Pronto!',
					text: 'Seu e-mail foi cadastrado em nossa base. A partir de agora você receberá novidades e ofertas periodicamente em seu e-mail.',
					icon: 'success',
					confirmButtonColor: '#22222D',
					timer: 2500
				});
				vm.email = "";
				return true;
			}
		}, function(err){
			console.log(err);
		});
	}
}