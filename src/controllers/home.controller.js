import home from "../views/home.html";
export default () => {
	const element = document.createElement("div");
	element.innerHTML = home;
	return element;
};
