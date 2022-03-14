import { server } from "../constants";
import { renderProduct } from "../helpers/renderProducts";
import productsView from "../views/search-results.html";

/**
 * Función encargada de hacer el request a la api de productos para traer los que cumplan con la consulta
 * @param {String} query Texto a consultar
 * @returns {import("./products.controller").Product[]} Arreglo de productos resultado
 */
const queryProducts = async (query) => {
	const response = await fetch(
		`https://${server}/api/products/search=${query}`
	);
	return await response.json();
};

/**
 * Función encargada de renderizar los resultados de los productos que cumplan con el texto de consulta
 * @param {String} input Texto a consultar en api productos
 */
export default async (input) => {
	const element = document.createElement("div");
	element.innerHTML = productsView;
	const productsContainer = element.querySelector("#products");
	const productsData = await queryProducts(input);
	const resultsLength = element.querySelector("#results-length");
	resultsLength.innerHTML = productsData.length + " items";
	document.getElementById("loading").style.display = "none";
	productsData.forEach((e) => renderProduct(e, productsContainer));

	return element;
};
