import productsView from "../views/products.html";
// import cartIcon from "../views/icon-cart.html";
// import placeholder from "../assets/default-product-image.png";
// import { getDiscountedPrice } from "../helpers/getDiscountedPrice";
import { renderProduct } from "../helpers/renderProducts";

const getProducts = async () => {
	const response = await fetch("http://localhost:4000/api/products");
	return await response.json();
};
const getCategories = async () => {
	const response = await fetch("http://localhost:4000/api/category");
	return await response.json();
};
const getProductsByCategories = async (query) => {
	const response = await fetch(`http://localhost:4000/api/category/${query}`);
	return await response.json();
};

export default async (category = "todas") => {
	// Creacion del elemento contenedor en el html
	const element = document.createElement("div");
	element.innerHTML = productsView;
	// Carga y renderizado de las categorias
	const categoriesDropdown = element.querySelector("#dropdown-list");
	const categoriesData = await getCategories();
	let categories = categoriesData.map(({ name }) => name);
	categories.forEach((e) => {
		categoriesDropdown.innerHTML += `<li><a class="dropdown-item category-item" href="${
			"#/products/" + encodeURI(e)
		}">${e}</a></li>`;
	});
	// Seleccionando elemento contenedor de los productos
	const productsElement = element.querySelector("#products");

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
