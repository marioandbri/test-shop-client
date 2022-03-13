import { pages } from "../controllers";

const app = document.getElementById("app");
export const router = async (router) => {
	app.innerHTML = "";
	switch (router) {
		case "#/":
			console.log("home!!");
			return app.appendChild(pages.home());
		case "#/products":
			app.innerHTML = "<h1 id='loading'>Loading...</h1>";
			return app.appendChild(await pages.products());
	}
};
