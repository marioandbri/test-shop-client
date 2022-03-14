import cartIcon from "../views/icon-cart.html";
import placeholder from "../assets/default-product-image.png";
import { getDiscountedPrice } from "../helpers/getDiscountedPrice";
export const renderProduct = (product, productsContainer) => {
	productsContainer.innerHTML += `
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
  <button class="btn btn-primary">${cartIcon}</button>
  </div>
  </div>
</div>
</div>
  `;
};
