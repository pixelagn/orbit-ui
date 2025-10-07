import { animate, inView } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

console.log("Hello, Orbit!");

// Animation for login page
inView("main section", (element) => {
    animate(
        element,
        { opacity: 1, y: [-100, 0], x: [0, 0] },
        {
            duration: 0.9,
            easing: [0.17, 0.55, 0.55, 1],
        }
    )

    return () => animate(element, { opacity: 0, x: -100 })
});

const nextBtn = document.getElementById("next-btn");
nextBtn.disabled = true;

const userTypesContainer = document.querySelectorAll("#user-types-container button");
let userType;

userTypesContainer.forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = btn.querySelector("input");

        if (!input) return;

        input.checked = true;

        nextBtn.disabled = false;

        if (input.id)
            userType = input.id;
    });
});

nextBtn.addEventListener("click", () => {
    if (!userType) return;

    location.replace(`/create-${userType}-account.html`);
});