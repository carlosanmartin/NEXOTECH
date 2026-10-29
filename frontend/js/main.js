import { renderHeader } from "../components/header.js";

document.addEventListener("DOMContentLoaded", () => {
    renderHeader();

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
