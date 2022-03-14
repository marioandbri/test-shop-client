import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import * as bootstrap from "bootstrap";
import { router } from "./router/index.router";
import "regenerator-runtime/runtime.js";

/**
 * Se agrega listener para el evento en el que cambiar la url posterior al Hash(#)
 */
window.addEventListener("hashchange", () => {
	router(window.location.hash);
});

/**
 * Se agrega funcion para cuando se accede a la url directamente desde la barra de navegacion y cumple con la condicion del hash(#)
 */
window.onload = () => {
	if (!window.location.hash) {
		window.location.replace(window.location + "#/");
	}
	router(window.location.hash);
};
