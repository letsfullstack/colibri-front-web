export const CatalogFindBuscaComponent = {
	options: {
		url: '/produtos/:ambiente/:tipo/:busca',
		state: 'catalog-find-busca',
		template: require("./catalog-find.component.html"),
		controller: "CatalogFindController",
		controllerAs: "vm",
		authenticate: false
	}
}