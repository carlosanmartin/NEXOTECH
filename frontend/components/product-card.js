const categoryIcons = {
    "Periféricos": "⌨",
    "Audio": "♫",
    "Almacenamiento": "▣",
    "Accesorios": "◇"
};

export function formatPrice(price, currency = "COP") {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(price);
}

export function createProductCard(product) {
    const article = document.createElement("article");

    article.className = "nx-product-card";

    const icon = categoryIcons[product.category] || "◇";

    article.innerHTML = `
        <div class="nx-product-image">
            <span class="nx-product-icon" aria-hidden="true">${icon}</span>
            <span class="nx-product-badge">Bajo consulta</span>
        </div>

        <div class="nx-product-info">
            <span class="nx-product-category">${product.category}</span>

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="nx-product-price">
                ${formatPrice(product.price, product.currency)}
            </div>

            <small class="nx-product-availability">
                ${product.availability}
            </small>

            <button
                type="button"
                class="nx-add-cart"
                data-product-id="${product.id}"
            >
                Agregar al carrito
            </button>
        </div>
    `;

    return article;
}
