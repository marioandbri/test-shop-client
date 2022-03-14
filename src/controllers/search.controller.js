import { renderProduct } from "../helpers/renderProducts";
import productsView from "../views/products.html";

const queryProducts = async (query) => {
	const response = await fetch(
		`http://localhost:4000/api/products/search=${query}`
	);
	return await response.json();
};

export default async (input) => {
	const element = document.createElement("div");
	element.innerHTML = productsView;
	const productsContainer = element.querySelector("#products");
	const productsData = await queryProducts(input);
	document.getElementById("loading").style.display = "none";
	productsData.forEach((e) => renderProduct(e, productsContainer));

	return element;
};
