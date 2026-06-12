const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

toggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open") ?? false;
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const data = window.siteData ?? { projectGroups: [], publications: [] };

const renderProjects = () => {
  const grid = document.querySelector("#project-grid");
  if (!grid) return;

  grid.innerHTML = data.projectGroups
    .map(
      (group) => {
        const isCommunicationGroup = group.type === "communication";
        const projectMarkup = group.projects
          .map((project) => {
            if (isCommunicationGroup) {
              return `
                <article class="communication-project-card">
                  <div class="communication-project-head">
                    <div>
                      <h3>${project.title}</h3>
                      <p class="project-period">${project.period}</p>
                    </div>
                    <span class="status-pill" data-status="${project.status}">${project.status}</span>
                  </div>
                  <p>${project.description}</p>
                  <ul>
                    ${project.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
                  </ul>
                  <div class="tag-list">${project.stack.map((item) => `<span>${item}</span>`).join("")}</div>
                </article>
              `;
            }

            return `
              <article class="project-card">
                <div>
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                </div>
                <div class="project-meta">
                  <span class="status-pill" data-status="${project.status}">${project.status}</span>
                  <span class="stack">${project.stack.join(" / ")}</span>
                </div>
                <div class="card-actions">
                  <a href="${project.detailsUrl}">View Details</a>
                  <a href="${project.githubUrl}">GitHub</a>
                  <a href="${project.demoUrl}">Demo</a>
                </div>
              </article>
            `;
          })
          .join("");

        return `
        <section class="project-group">
          <h3>${group.title}</h3>
          <div class="${isCommunicationGroup ? "communication-project-list" : "card-grid project-grid"}">
            ${projectMarkup}
          </div>
        </section>
      `;
      },
    )
    .join("");
};

const renderPublications = () => {
  const list = document.querySelector("#publication-list");
  if (!list) return;

  list.innerHTML = data.publications
    .map(
      (publication, index) => `
        <li class="publication-item">
          <span class="pub-index">[${index + 1}]</span>
          <div class="pub-entry">
            <p>
              ${publication.authors}. <strong>${publication.title}</strong>.
              <em>${publication.note}</em>.
              ${publication.description}
            </p>
            <div class="publication-links">
              ${publication.links.map((link) => `<a href="${link.url}">${link.label}</a>`).join("")}
            </div>
          </div>
        </li>
      `,
    )
    .join("");
};

renderProjects();
renderPublications();
