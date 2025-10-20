import { animate, inView } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

console.log("Hello, Orbit!");

// Animation for login page
inView("main section", (element) => {
    animate(
        element,
        { opacity: 1, y: [-100, 0], x: [0, 0] },
        {
            duration: 0.5,
            easing: [0.17, 0.55, 0.55, 1],
        }
    )

    return () => animate(element, { opacity: 0, x: -100 })
});

const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email-control");
const submitBtn = document.getElementById("submit-btn");

emailInput.classList.add("hidden!");

// validate phone input
phoneInput.addEventListener("input", (e) => {
    if (e.target.value.length > 9) {
        phoneInput.value = e.target.value.slice(0, 9);
    }

    if (e.target.value.length === 9) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

emailInput.addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

const convertBtn = document.getElementById("convert-btn");

convertBtn.addEventListener("click", () => {
    if (convertBtn.getAttribute("forgot-type") === "phone") {
        convertBtn.setAttribute("forgot-type", "email");
        convertBtn.innerHTML = "استعادة البريد الإلكتروني المرتبط بالحساب";
        emailInput.classList.remove("hidden!");
        phoneInput.classList.add("hidden!");
    } else {
        convertBtn.setAttribute("forgot-type", "phone");
        convertBtn.innerHTML = "استعادة الرقم المرتبط بالحساب";
        phoneInput.classList.remove("hidden!");
        emailInput.classList.add("hidden!");
    }
});