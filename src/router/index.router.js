import { pages } from "../controllers";
import Loading from "../views/loading.html";

/**
 * @type {Node} Elemento HTML que contiene la app
 */
const app = document.getElementById("app");

/**
 * Se encarga de enrutar las peticiones url dentro de la app, actualizando solo los componentes sin cambiar de pagina
 * @param {URLString} router Recibe una cadena de texto correspondiente la URL luego del Hash(#)
 * @returns
 */
export const router = async (router) => {
	//Se vacia el contenedor de la app
	app.innerHTML = "";

	/**
	 * @type {Node} Elemento HTML correspondiente al cuadro de texto para la busqueda
	 */
	const input = document.getElementById("input-search");

	/**
	 * @type {Node} Elemento HTML que contiene la el boton de busqueda
	 */
	const searchButton = document.getElementById("search");
	/**
	 * Se encarga de ejecutar una nueva busqueda al hacer click en el botón de busqueda
	 * @returns Actualiza el componente de la app para mostrar los resultados de la busqueda
	 */
	searchButton.onclick = async () => {
		const destination = "/#/search=" + input.value;
		window.history.pushState({}, "", destination);
		app.innerHTML = Loading;
		return app.appendChild(await pages.search(input.value));
	};

	/**
	 * @type {String} Se inicializa la variable query para alojar el texto de la consulta y poder pasarlo como parametro
	 */
	let query;
	//Se revisa si el router viene de la ruta search o de la ruta products
	if (router.indexOf("search") > -1) {
		query = router.replace("#/search=", "");
		router = router.replace(/=.*/, "");
	}
	if (router.indexOf("products/") > -1) {
		query = router.replace("#/products/", "");
		router = router.replace(/\/\w*[%20]?\s?\w*$/, "");
	}
	/**
	 * Logica del enrutador que se encarga de encaminar el flujo dependiendo de la ruta que se visita
	 */
	switch (router) {
		case "#/":
			console.log("home!!");
			return app.appendChild(pages.home());
		case "#/products":
			app.innerHTML = Loading;
			return app.appendChild(await pages.products(query));
		case "#/search":
			console.log(query);
			app.innerHTML = Loading;
			return app.appendChild(await pages.search(query));
		default:
			return app.appendChild(pages.notFound());
	}
};
