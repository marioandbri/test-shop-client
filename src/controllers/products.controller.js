import productsView from "../views/products.html";
// import cartIcon from "../views/icon-cart.html";
// import placeholder from "../assets/default-product-image.png";
// import { getDiscountedPrice } from "../helpers/getDiscountedPrice";
import { renderProduct } from "../helpers/renderProducts";
import { server } from "../constants";
/**
 * @typedef {Object} Product
 * @property {Number} id
 * @property {String} name
 * @property {String} url_image
 * @property {Number} price
 * @property {Number} discount
 * @property {Number} category
 */

/**
 * @typedef {Object} Category
 * @property {Number} id
 * @property {String} name
 */

/**
 * Función encargada de realizar la consulta a la api de productos
 * @returns {Product[]} Array de productos
 */
const getProducts = async () => {
	const response = await fetch(`http://${server}/api/products`);
	return await response.json();
};

/**
 * Función encargada de realizar la consulta a la api de categorias
 * @returns {Category[]}
 */
const getCategories = async () => {
	const response = await fetch(`http://${server}/api/category`);
	return await response.json();
};

/**
 * Función encargada de realizar la consulta a la api de categorias y traer los productos de una categoria en concreto
 * @param {Category} query Nombre de la categoria a consultar
 * @returns {{Category:Product[]}} El objeto categoria con el array de productos
 */
const getProductsByCategories = async (query) => {
	const response = await fetch(`http://${server}/api/category/${query}`);
	return await response.json();
};

/**
 * Funcion encargada de renderizar los productos, opcionalmente recibe como parametro la categoria de productos que se desea consultar.
 */
export default async (category = "todas") => {
	/**
	 * @type {Node} Elemento HTML Contenedor
	 */
	const element = document.createElement("div");
	element.innerHTML = productsView;
	/**
	 * @type {Node} Elemento HTML que contiene la lista de categorias para el Drowdown
	 */
	const categoriesDropdown = element.querySelector("#dropdown-list");

	const categoriesData = await getCategories();
	/**
	 * @type {Array<String>} Array con los nombres de las categorias
	 */
	let categories = categoriesData.map(({ name }) => name);

	categories.forEach((e) => {
		categoriesDropdown.innerHTML += `<li><a class="dropdown-item category-item" href="${
			"#/products/" + encodeURI(e)
		}">${e}</a></li>`;
	});

	/**
	 * @type {Node} Elemento HTML contenedor de la lista de productos
	 */
	const productsElement = element.querySelector("#products");

	/**
	 * Se revisa si se debe renderizar todos los productos o los productos de una categoria
	 */
	if (category === "todas") {
		const productsData = await getProducts();
		document.getElementById("loading").style.display = "none";
		productsData.forEach((e) => renderProduct(e, productsElement));
	} else {
		const productsData = await getProductsByCategories(category);
		document.getElementById("loading").style.display = "none";
		productsData?.products.forEach((e) => renderProduct(e, productsElement));
	}

	return element;
};
