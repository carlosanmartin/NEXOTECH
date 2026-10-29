const categoryIcons = {
    "Periféricos": "⌨",
    "Audio": "♫",
    "Almacenamiento": "▣",
    "Accesorios": "◆"
};

export function formatPrice(price, currency = "COP") {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(price);
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = String(text);
    }

    return element;
}

export function createProductCard(product) {
    const article = createElement("article", "nx-product-card");

    const image = createElement("div", "nx-product-image");

    const icon = createElement(
        "span",
        "nx-product-icon",
        categoryIcons[product.category] || "◆"
    );

    icon.setAttribute("aria-hidden", "true");

    const badge = createElement(
        "span",
        "nx-product-badge",
        "Bajo consulta"
    );

    image.append(icon, badge);

    const info = createElement("div", "nx-product-info");

    const category = createElement(
        "span",
        "nx-product-category",
        product.category
    );

    const title = createElement("h3", "", product.name);

    const description = createElement(
        "p",
        "",
        product.description
    );

    const price = createElement(
        "div",
        "nx-product-price",
        formatPrice(product.price, product.currency)
    );

    const availability = createElement(
        "small",
        "nx-product-availability",
        product.availability
    );

    const button = createElement(
        "button",
        "nx-add-cart",
        "Agregar al carrito"
    );

    button.type = "button";
    button.dataset.productId = product.id;

    // El carrito se implementará en el siguiente sprint.
    button.disabled = true;
    button.title = "Carrito próximamente";

    info.append(
        category,
        title,
        description,
        price,
        availability,
        button
    );

    article.append(image, info);

    return article;
}
