import home from "../views/home.html";

/**
 * Se encarga de dibujar la vista del Home
 */
export default () => {
	const element = document.createElement("div");
	element.innerHTML = home;
	return element;
};
