
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

async function loadGitHubRepos() {
    const username = "YOUR_GITHUB_USERNAME";
    const projectList = document.getElementById("project-list");

    if (!projectList) return;

    const repoSection = document.createElement("div");
    repoSection.className = "card";
    repoSection.innerHTML = "<h3>Latest GitHub Repositories</h3><p>Loading repositories...</p>";
    projectList.after(repoSection);

    try {
        const url =
            "https://api.github.com/users/" +
            encodeURIComponent(username) +
            "/repos?sort=updated&direction=desc&per_page=100";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("GitHub API request failed.");
        }

        const repos = await response.json();

        const latest = repos
            .filter(repo => !repo.fork)
            .sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 5);

        repoSection.innerHTML = "<h3>Latest GitHub Repositories</h3>";

        if (latest.length === 0) {
            repoSection.textContent =
                "No public repositories found for this account.";
            return;
        }

        const list = document.createElement("ul");

        latest.forEach(function (repo) {
            const item = document.createElement("li");
            const link = document.createElement("a");

            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            item.appendChild(link);
            item.appendChild(
                document.createTextNode(
                    " — Main language: " +
                    (repo.language || "Not specified")
                )
            );

            list.appendChild(item);
        });

        repoSection.appendChild(list);
    } catch (error) {
        repoSection.textContent =
            "GitHub repositories are currently unavailable.";
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
