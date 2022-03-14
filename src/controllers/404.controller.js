import notFound from "../views/404.html";

/**
 * Se encarga de dibujar la vista del 404
 */
export default () => {
	const element = document.createElement("div");
	element.innerHTML = notFound;
	return element;
};
