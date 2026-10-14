
document.addEventListener("DOMContentLoaded", function () {
    loadProjects();
    loadGitHubRepos();
    setupContactForm();
});

async function loadProjects() {
    const projectList = document.getElementById("project-list");

    if (!projectList) return;

    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Projects could not be loaded.");
        }

        const projects = await response.json();
        projectList.innerHTML = "";

        projects.forEach(function (project) {
            const card = document.createElement("article");
            card.className = "card project";

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const technologies = document.createElement("p");
            technologies.textContent =
                "Technologies: " +
                (project.technologies || []).join(", ");

            const role = document.createElement("p");
            role.textContent = "My Role: " + project.role;

            card.append(title, description, technologies, role);

            if (project.screenshot) {
                const image = document.createElement("img");
                image.src = "images/" + project.screenshot;
                image.alt = project.title + " screenshot";
                image.loading = "lazy";
                image.style.maxWidth = "100%";
                image.style.borderRadius = "8px";
                image.onerror = function () {
                    image.remove();
                };
                card.appendChild(image);
            }

            if (project.github &&
                project.github !== "https://github.com/") {
                const link = document.createElement("a");
                link.href = project.github;
                link.textContent = "View on GitHub";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                card.appendChild(link);
            }

            projectList.appendChild(card);
        });
    } catch (error) {
        projectList.textContent =
            "Sorry, projects could not be loaded. Please try again later.";
        console.error(error);
    }
}
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form || !status) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        status.textContent =
            "Thank you! Your form was submitted on this page.";

        form.reset();
    });
}
// Back to Top feature
const topButton = document.getElementById("back-to-top");

if (topButton) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    });

    topButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
