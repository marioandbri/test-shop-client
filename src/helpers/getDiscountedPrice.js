/**
 *
 * @param {Number} price
 * @param {Number} discount
 * @returns {Number}
 */
export const getDiscountedPrice = (price, discount) => {
	let percentage = price * (discount / 100);
	let discountedPrice = price - percentage;
	return discountedPrice;
};
