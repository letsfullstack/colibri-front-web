export default {
	links: {
		catalogo: 'https://conteudo.colibrimoveis.com.br/colecao-2021',
	},
	dev: {
		SITE_URL: "http://0.0.0.0:3009",
		SERVER_URL: "http://0.0.0.0:3009/api/",
		CLIENT_URL: "https://colibrimoveis.portaldocliente.online/",
		STORAGE_URL: "http://0.0.0.0/colibrifiles/",
		PROD: false
	},
	production: {
		SITE_URL: "https://www.colibrimoveis.com.br",
		SERVER_URL: "https://www.colibrimoveis.com.br/api/",
		CLIENT_URL: "https://colibrimoveis.portaldocliente.online/",
		STORAGE_URL: "https://www.colibrimoveis.com.br/files/",
		PROD: true
	}
}
