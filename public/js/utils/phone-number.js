import { countryCodes } from "../constants/country-codes.js"

const countryCodesDropdown = document.querySelector("#dropdown-phone ul");
const countryCodesDropdownButtonValue = document.querySelector("#dropdown-phone-button-value");

console.log(countryCodesDropdown);

if (countryCodesDropdown) {
    countryCodes.forEach((countryCode) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("inline-flex", "text-start", "w-full", "px-4", "py-2", "text-sm", "text-gray-700", "hover:bg-gray-100", "dark:text-gray-200", "dark:hover:bg-gray-600", "dark:hover:text-white");
        button.role = "menuitem";
        button.innerHTML = `
            <span class="inline-flex">
                ${countryCode.name} (${countryCode.callingCode})
            </span>
        `;

        if (countryCodesDropdownButtonValue.innerHTML === countryCode.callingCode) {
            button.classList.add("bg-main/10");
        }

        button.addEventListener("click", () => {
            countryCodesDropdownButtonValue.innerHTML = countryCode.callingCode;

            document.querySelectorAll("#dropdown-phone ul li button").forEach((button) => {
                button.classList.remove("bg-main/10");
            });

            button.classList.add("bg-main/10");
        });

        li.appendChild(button);
        countryCodesDropdown.appendChild(li);
    });
}