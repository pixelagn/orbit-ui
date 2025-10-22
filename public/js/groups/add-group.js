import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

const addGroupBtn = document.getElementById("add-group-btn");

if (addGroupBtn) {
    addGroupBtn.addEventListener("click", () => {
        animate("#add-group-modal", { opacity: 1, y: [50, 0] }, { delay: stagger(0.02) })
    });
}

const descriptionControl = document.querySelector("#add-group-modal #description-control");
const descriptionLength = document.querySelector("#add-group-modal #description-length");

if (descriptionControl && descriptionLength) {
    descriptionControl.addEventListener("input", (e) => {
        const value = e.target.value;
        const length = value.length;

        descriptionLength.textContent = `${length} / 100`;
    });
}