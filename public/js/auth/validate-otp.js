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

const otpInputs = document.querySelectorAll("#otp-inputs input");
const submitBtn = document.getElementById("submit-btn");

let disabled = [true, true, true, true];

for (let i = 0; i < otpInputs.length; i++) {
    otpInputs[i].addEventListener("input", (e) => {
        if (isNaN(e.target.value)) {
            otpInputs[i].value = "";
        }

        if (e.target.value.length === 1) {
            otpInputs[i].value = e.target.value.padStart(1, "0");
        }

        if (i < otpInputs.length - 1 && e.target.value) {
            otpInputs[i + 1].focus();
        }

        if (e.target.value) {
            otpInputs[i].classList.add("bg-main/10", "text-main", "font-semibold", "border-none");
            disabled[i] = false;
        } else {
            otpInputs[i].classList.remove("bg-main/10", "text-main", "font-semibold", "border-none");
            disabled[i] = true;
        }

        submitBtn.disabled = !disabled.every((val) => val === false);
    });
}

const timeContainer = document.getElementById("time-container");
const resendBtn = document.getElementById("resend-btn");

let minutes = 4;
let seconds = 59;

function countdown() {
    const interval = setInterval(() => {
        timeContainer.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (minutes === 0 && seconds === 0) {
            clearInterval(interval);
            return;
        }
        
        if (seconds === 0) {
            seconds = 59;
            minutes--;
        }
        
        seconds--;

        if (minutes < 1) {
            timeContainer.classList.add("text-warning!");
            document.querySelector("#time-container + span").classList.add("text-warning!");
        }
    }, 1000);

    if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        return;
    }
}

countdown();

resendBtn.onclick = (e) => {
    location.reload();
}