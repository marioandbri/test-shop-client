import { server } from "../constants";
import { renderProduct } from "../helpers/renderProducts";
import productsView from "../views/search-results.html";

const queryProducts = async (query) => {
	const response = await fetch(`http://${server}/api/products/search=${query}`);
	return await response.json();
};

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
