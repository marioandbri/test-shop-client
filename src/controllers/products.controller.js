import productsView from "../views/products.html";
import placeholder from "../assets/default-product-image.png";
import { getDiscountedPrice } from "../helpers/getDiscountedPrice";

const getProducts = async () => {
	const response = await fetch("http://localhost:4000/api/products");
	return await response.json();
};
export default async () => {
	const element = document.createElement("div");
	element.innerHTML = productsView;

	const productsElement = element.querySelector("#products");
	const productsData = await getProducts();
	document.getElementById("loading").style.display = "none";
	productsData.forEach((product) => {
		productsElement.innerHTML += `
    <div class="card grid-item" style="width: 18rem;">
  <img src=${
		product?.url_image ? product.url_image : new URL(placeholder)
	} class="card-img-top" alt="...">
  ${
		product?.discount
			? `<span class="product-discount position-absolute badge bg-danger translate-middle pill-rounded">${product.discount}%</span>`
			: ""
	}
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <div class="card-footer product-footer"><div class="btn-group">
    <div class="btn btn-secondary disabled product-price" >$ ${getDiscountedPrice(
			product.price,
			product.discount
		)}</div>
    <button class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg></button>
    </div>
    </div>
  </div>
</div>
    `;
	});

	return element;
};
