import Home from "./home.controller";
import Products from "./products.controller";
import Search from "./search.controller";
import NotFound from "./404.controller";

/**
 * @type {{home:Function,products:Function,search:Function,notFound:Function}} Se encarga de contener las diferentes rutas y su respectivo controlador para dibujarlas
 */
export const pages = {
	home: Home,
	products: Products,
	search: Search,
	notFound: NotFound,
};
