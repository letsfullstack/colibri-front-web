export const CatalogFindTipoComponent = {
	options: {
		url: '/produtos/:ambiente/:tipo',
		state: 'catalog-find-tipo',
		template: require("./catalog-find.component.html"),
		controller: "CatalogFindController",
		controllerAs: "vm",
		authenticate: false
	}
}