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

const stepers = document.querySelectorAll("#steper li");

let currentStep = 0;

const checkIcon = `
    <svg width="16" height="16" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75.1903 18.9222C76.649 22.6962 74.6035 25.2801 70.6443 27.8253C67.4498 29.8789 63.3798 32.1036 59.0673 35.9072C54.8398 39.6358 50.714 44.1268 47.0474 48.5471C43.3957 52.9494 40.292 57.1692 38.099 60.2937C36.6819 62.3127 34.7042 65.3244 34.7042 65.3244C33.3095 67.531 30.8022 68.8666 28.1136 68.833C25.4245 68.7995 22.9545 67.4028 21.6202 65.1612C18.2095 59.4312 15.5775 57.1683 14.3679 56.3554C11.1311 54.1803 7.33325 53.8586 7.33325 48.7899C7.33325 44.7645 10.7325 41.5013 14.9256 41.5013C17.886 41.6106 20.6377 42.7749 23.0757 44.4132C24.6342 45.4605 26.2851 46.8457 28.0023 48.669C30.0177 45.9201 32.4463 42.7486 35.1688 39.4665C39.1225 34.7 43.7893 29.5867 48.794 25.1726C53.7138 20.8334 59.4019 16.7717 65.4311 14.6242C69.3624 13.2239 73.7317 15.1482 75.1903 18.9222Z" fill="#ffffff"/>
    </svg>
`;

const stepContainers = document.querySelectorAll("section.step-container");

stepContainers.forEach((container) => {
    container.style.display = "none";
});

stepContainers[currentStep].style.display = "flex";
stepers[currentStep].classList.add("text-black");
stepers[currentStep].querySelector(".step-marker").classList.add("bg-main", "outline", "outline-main", "border-4", "border-white");

const nextStep = () => {
    stepContainers.forEach((container) => {
        container.style.display = "none";
    });

    currentStep += 1;

    for (let i = 0; i < stepers.length; i++) {
        if (i < currentStep) {
            stepers[i].querySelector(".step-marker").classList.remove("outline", "outline-main", "border-4", "border-white");
            stepers[i].querySelector(".step-marker").innerHTML = checkIcon;
        }
    }

    stepContainers[currentStep].style.display = "flex";
    stepers[currentStep].classList.add("text-black");
    stepers[currentStep].querySelector(".step-marker").classList.add("bg-main", "outline", "outline-main", "border-4", "border-white");
}

// Back button
document.getElementById("back-btn-2").addEventListener("click", () => {
    stepContainers.forEach((container) => {
        container.style.display = "none";
    });

    currentStep -= 1;

    for (let i = 0; i < stepers.length; i++) {
        if (i > currentStep) {
            stepers[i].classList.remove("text-black");
            stepers[i].querySelector(".step-marker").classList.remove("bg-main", "outline", "outline-main", "border-4", "border-white");
            stepers[i].querySelector(".step-marker").innerHTML = "";
        }
    }

    stepContainers[currentStep].style.display = "flex";
    stepers[currentStep].classList.add("text-black");
    stepers[currentStep].querySelector(".step-marker").classList.add("bg-main", "outline", "outline-main", "border-4", "border-white");
    stepers[currentStep].querySelector(".step-marker").innerHTML = "";
});

// Next button
document.getElementById("next-btn-1").addEventListener("click", nextStep);

document.getElementById("next-btn-2").addEventListener("click", nextStep);

document.getElementById("next-btn-3").addEventListener("click", nextStep);

// Validate OTP inputs
const otpInputs = document.querySelectorAll("#otp-inputs input");
const submitBtn = document.getElementById("next-btn-3");

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

// Drag and drop
const dropArea = document.getElementById('drop-area');
const fileInput = document.querySelector('#drop-area input[type="file"]');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('bg-main/10'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('bg-main/10'), false);
});

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files); // Call a function to process the files
}

dropArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

const fileContainer = document.querySelector('.file-container');

function handleFiles(files) {
    fileContainer.innerHTML = '';
    // Example: Iterate through files and log their names
    for (const file of files) {
        const article = document.createElement('article');
        article.classList.add('flex', 'items-center', 'justify-between', 'py-2', 'px-4', 'border', 'border-border', 'rounded-2xl');

        article.innerHTML = `
            <section class="flex gap-2">
                <section class="flex flex-col justify-center items-center w-12 h-12 bg-[#EDEDED] rounded-lg">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 13.7686V12.9648C3.5 9.99747 3.5 8.51378 3.96894 7.3288C4.72281 5.42377 6.31714 3.9211 8.33836 3.21057C9.59563 2.76859 11.1698 2.76859 14.3182 2.76859C16.1173 2.76859 17.0168 2.76859 17.7352 3.02114C18.8902 3.42717 19.8012 4.28583 20.232 5.37442C20.5 6.05156 20.5 6.89938 20.5 8.59502V12.7828V13.7686" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.5 12.7686C3.5 10.9276 4.99238 9.43522 6.83333 9.43522C7.49912 9.43522 8.28404 9.55188 8.93137 9.37843C9.50652 9.22432 9.95576 8.77507 10.1099 8.19992C10.2833 7.55259 10.1667 6.76767 10.1667 6.10189C10.1667 4.26094 11.6591 2.76855 13.5 2.76855" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.5 22.7686V19.7686M3.5 19.7686V17.9686C3.5 17.4029 3.5 17.12 3.67574 16.9443C3.85147 16.7686 4.13431 16.7686 4.7 16.7686H5.5C6.32843 16.7686 7 17.4401 7 18.2686C7 19.097 6.32843 19.7686 5.5 19.7686H3.5ZM20.5 16.7686H19C18.0572 16.7686 17.5858 16.7686 17.2929 17.0614C17 17.3543 17 17.8257 17 18.7686V19.7686M17 22.7686V19.7686M17 19.7686H19.5M14 19.7686C14 21.4254 12.6569 22.7686 11 22.7686C10.6262 22.7686 10.4392 22.7686 10.3 22.6882C9.96665 22.4957 10 22.1061 10 21.7686V17.7686C10 17.431 9.96665 17.0414 10.3 16.8489C10.4392 16.7686 10.6262 16.7686 11 16.7686C12.6569 16.7686 14 18.1117 14 19.7686Z" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </section>

                <section class="text-[12px]">
                    <p>${file.name}</p>
                    <p class="text-[#AAAAAA]">${file.name.split('.').pop()}</p>
                </section>
            </section>
        `;

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('text-secondary-foreground', 'hover:text-main');
        button.innerHTML = `
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2562 3.51263C13.5816 3.83807 13.5816 4.36571 13.2562 4.69114L3.92283 14.0245C3.5974 14.3499 3.06976 14.3499 2.74432 14.0245C2.41888 13.699 2.41888 13.1714 2.74432 12.846L12.0777 3.51263C12.4031 3.1872 12.9307 3.1872 13.2562 3.51263Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.74432 3.51263C3.06976 3.1872 3.5974 3.1872 3.92283 3.51263L13.2562 12.846C13.5816 13.1714 13.5816 13.699 13.2562 14.0245C12.9307 14.3499 12.4031 14.3499 12.0777 14.0245L2.74432 4.69114C2.41888 4.36571 2.41888 3.83807 2.74432 3.51263Z" fill="currentColor"/>
            </svg>
        `;

        article.appendChild(button);

        button.addEventListener('click', () => {
            fileContainer.removeChild(article);

            fileInput.files = undefined;
        });

        fileContainer.appendChild(article);
        // Implement file preview (e.g., for images using FileReader)
        // Implement file upload (e.g., using XMLHttpRequest or Fetch API)
    }
}

const photoContainer = document.querySelector('#photo-container');
const photoButton = document.querySelector('#photo-btn');
const photoInput = document.querySelector('#photo');

photoButton.addEventListener('click', () => {
    photoInput.click();
});

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        photoContainer.querySelector('svg').style.display = 'none';
        photoContainer.querySelector('img').src = e.target.result;
        photoContainer.querySelector('img').style.display = 'block';
    };

    reader.readAsDataURL(file);
});