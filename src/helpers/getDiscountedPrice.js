/**
 * Se encarga de hacer el calculo del precio luego del descuento
 * @param {Number} price Precio del producto
 * @param {Number} discount Porcentaje de descuento del producto
 * @returns {Number} Precio final del producto
 */
export const getDiscountedPrice = (price, discount) => {
	let percentage = price * (discount / 100);
	let discountedPrice = price - percentage;
	return discountedPrice;
};
