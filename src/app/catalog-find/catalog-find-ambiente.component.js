export const CatalogFindAmbienteComponent = {
	options: {
		url: '/produtos/:ambiente',
		state: 'catalog-find-ambiente',
		template: require("./catalog-find.component.html"),
		controller: "CatalogFindController",
		controllerAs: "vm",
		authenticate: false
	}
}
