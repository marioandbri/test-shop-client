import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import * as bootstrap from "bootstrap";
import { router } from "./router/index.router";
import "regenerator-runtime/runtime.js";

window.addEventListener("hashchange", () => {
	router(window.location.hash);
});

window.onload = () => {
	if (!window.location.hash) {
		window.location.replace(window.location + "#/");
	}
	router(window.location.hash);
};
