import { products, productCategories } from "../data/products.js";
import { createProductCard } from "../components/product-card.js";
import { renderHeader } from "../components/header.js";

document.addEventListener("DOMContentLoaded", () => {
    renderHeader();

    const grid = document.getElementById("products-grid");
    const search = document.getElementById("product-search");
    const category = document.getElementById("product-category");
    const sort = document.getElementById("product-sort");
    const results = document.getElementById("product-results");

    document.getElementById("year").textContent =
        new Date().getFullYear();

    productCategories
        .filter(item => item !== "Todos")
        .forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            category.appendChild(option);
        });

    function renderProducts() {
        const query = search.value.trim().toLocaleLowerCase("es");
        const selectedCategory = category.value;
        const selectedSort = sort.value;

        let filtered = products.filter(product => {
            const matchesSearch =
                product.name.toLocaleLowerCase("es").includes(query) ||
                product.description.toLocaleLowerCase("es").includes(query);

            const matchesCategory =
                selectedCategory === "Todos" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        if (selectedSort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        }

        if (selectedSort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        }

        grid.replaceChildren();

        filtered.forEach(product => {
            grid.appendChild(createProductCard(product));
        });

        results.textContent =
            `${filtered.length} productos encontrados`;
    }

    search.addEventListener("input", renderProducts);
    category.addEventListener("change", renderProducts);
    sort.addEventListener("change", renderProducts);

    renderProducts();
});
