const escapeHTML = (value) =>
  String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        char
      ],
  );

const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

function render(data) {
  const { profile, experience, projects, capabilities } = data;
  const projectMarkup = projects
    .map(
      (project) => `
    <article class="project project--${project.palette}" tabindex="0">
      <div class="project-top"><span class="mono">${project.number} / ${project.year}</span><span class="project-open">View case study ${arrow}</span></div>
      <div class="project-visual"><div class="visual-object"><span>${project.title.slice(0, 1)}</span></div><div class="visual-shadow"></div></div>
      <div class="project-copy"><p class="mono">${escapeHTML(project.type)}</p><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.summary)}</p><div class="tags">${project.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div></div>
    </article>`,
    )
    .join("");
  const experienceMarkup = experience
    .map(
      (item) =>
        `<div class="experience-row"><span class="mono">${item.period}</span><strong>${item.company}</strong><span>${item.title}</span></div>`,
    )
    .join("");
  const linkMarkup = profile.links
    .map(
      (link) =>
        `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label} ${arrow}</a>`,
    )
    .join("");

  document.title = `${profile.name} — ${profile.role}`;
  document.querySelector("#app").innerHTML = `
    <header class="site-header container">
      <a class="monogram" href="#top" aria-label="${profile.name}, home">${profile.portrait}</a>
      <nav aria-label="Main navigation"><a href="#about">About</a><a href="#work">Selected work</a><a href="#contact">Contact</a></nav>
      <a class="availability mono" href="mailto:${profile.email}"><i></i>${profile.availability}</a>
    </header>
    <main id="top">
      <section class="hero container reveal">
        <div class="eyebrow mono"><span>Portfolio 2025</span><span>${profile.location}</span></div>
        <h1>Designing <em>clarity</em><br>for the curious.</h1>
        <div class="hero-footer"><p>${profile.intro}</p><a class="round-link" href="#work" aria-label="Explore selected work">↓</a></div>
      </section>
      <section class="about-section container section" id="about">
        <div class="section-label mono">(01) / About</div>
        <div class="about-content reveal"><p class="about-statement">${profile.about}</p><div class="about-grid"><div class="capabilities"><p class="mono">What I bring</p>${capabilities.map((item, index) => `<div><span>0${index + 1}</span>${item}</div>`).join("")}</div><div class="experience"><p class="mono">Selected experience</p>${experienceMarkup}</div></div></div>
      </section>
      <section class="work-section section" id="work">
        <div class="container work-heading"><div class="section-label mono">(02) / Selected work</div><p>Some recent collaborations<br>and independent explorations.</p></div>
        <div class="project-rail">${projectMarkup}</div>
      </section>
      <section class="contact-section container section" id="contact">
        <div class="section-label mono">(03) / Contact</div>
        <div class="contact-content reveal"><p class="mono contact-kicker">Have a good problem?</p><h2>Let's make<br>something <em>matter.</em></h2><a class="email-link" href="mailto:${profile.email}">${profile.email} ${arrow}</a></div>
        <footer><span class="mono">© ${new Date().getFullYear()} ${profile.name}</span><div>${linkMarkup}</div><a class="back-top mono" href="#top">Back to top ↑</a></footer>
      </section>
    </main>`;

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal, .project")
    .forEach((element) => observer.observe(element));
}

fetch("data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Could not load portfolio data");
    return response.json();
  })
  .then(render)
  .catch((error) => {
    document.querySelector("#app").innerHTML =
      `<p class="error">${escapeHTML(error.message)}. Please refresh.</p>`;
  });
