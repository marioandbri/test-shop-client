import { pages } from "../controllers";

const app = document.getElementById("app");
const search = document.getElementById("search");
export const router = async (router) => {
	app.innerHTML = "";

	const input = document.getElementById("input-search");
	const searchButton = document.getElementById("search");
	searchButton.onclick = async () => {
		const destination = "/#/search=" + input.value;
		window.history.pushState({}, "", destination);
		app.innerHTML = "<h1 id='loading'>Loading...</h1>";
		return app.appendChild(await pages.search(input.value));
	};
	let query;
	if (router.indexOf("search") > -1) {
		query = router.replace("#/search=", "");
		router = router.replace(/=.*/, "");
	}
	if (router.indexOf("products/") > -1) {
		query = router.replace("#/products/", "");
		router = router.replace(/\/\w*[%20]?\s?\w*$/, "");
	}

	switch (router) {
		case "#/":
			console.log("home!!");
			return app.appendChild(pages.home());
		case "#/products":
			app.innerHTML = "<h1 id='loading'>Loading...</h1>";
			return app.appendChild(await pages.products(query));
		case "#/search":
			console.log(query);
			app.innerHTML = "<h1 id='loading'>Loading...</h1>";
			return app.appendChild(await pages.search(query));
	}
};
