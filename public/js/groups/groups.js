import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

// Animation for login page
inView("main > *", (element) => {
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

const checkboxAllGroups = document.getElementById("checkbox-all-groups");
const checkboxesGroup = document.querySelectorAll("#groups-table tbody tr td:first-child input[type='checkbox']");
const groupButtonsContainer = document.getElementById("group-buttons");

if (checkboxAllGroups && checkboxesGroup && groupButtonsContainer) {
    checkboxAllGroups.addEventListener("change", function() {
        checkboxesGroup.forEach(checkbox => {
            if (this.checked) {
                if (groupButtonsContainer.classList.contains("hidden")) {
                    animate("#group-buttons button", { opacity: 1, y: [50, 0] }, { delay: stagger(0.05) })
                }
                groupButtonsContainer.classList.remove("hidden");
            } else {
                if (!groupButtonsContainer.classList.contains("hidden")) {
                    animate("#group-buttons button", { opacity: 0, y: [-50, 0] }, { delay: stagger(0.05) })
                }
                groupButtonsContainer.classList.add("hidden");
            }

            checkbox.checked = this.checked;
        });
    });

    checkboxesGroup.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            if (document.querySelectorAll("#groups-table tbody tr td:first-child input[type='checkbox']:checked").length > 0) {
                if (groupButtonsContainer.classList.contains("hidden")) {
                    animate("#group-buttons button", { opacity: 1, y: [50, 0] }, { delay: stagger(0.05) })
                }
                groupButtonsContainer.classList.remove("hidden");
            } else {
                if (!groupButtonsContainer.classList.contains("hidden")) {
                    animate("#group-buttons button", { opacity: 0, y: [-50, 0] }, { delay: stagger(0.05) })
                }
                groupButtonsContainer.classList.add("hidden");
            }
        });
    });
}

// Filter groups -------------------------------------------------------------
const filtersBtn = document.getElementById("filtersBtn");

if (filtersBtn) {
    filtersBtn.addEventListener("click", () => {
        animate("#dropdown-filters", { opacity: 1, y: [100, 50] }, { delay: stagger(0.05) })
    });
}

// Delete group -------------------------------------------------------------
const deleteSelectedBtn = document.getElementById("delete-selected-btn");

if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", () => {
        animate("#confirm-delete", { opacity: 1, y: [100, 0] }, { delay: stagger(0.05) })

        const selected = document.querySelectorAll("#groups-table tbody tr td:first-child input[type='checkbox']:checked");

        console.log(selected);
    });
}