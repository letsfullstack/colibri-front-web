export const NewsDiretive = {
	options: function () {
		return {
			restrict: 'E',
			template: require("./newsletter.diretive.html"),
			scope: {},
			controller: ["$scope", "HttpService", NewsController],
			controllerAs: "vm",
			bindToController: true
		}
	},
	element: "newsDiretive"
}

function NewsController($scope, HttpService) {
	var vm = this;

	vm.subscribe = function () {
		if(!vm.email){
			Swal.fire({
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
				Swal.fire({
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