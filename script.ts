const add_experience_btn = document.getElementById(
  "add-experience-btn"
) as HTMLButtonElement;

const experience_list = document.getElementById(
  "experience-list"
) as HTMLUListElement;

add_experience_btn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="flex flex-col">
       <label for="exp_job-title">Job Title</label>
       <input style="width: 100%" required type="text" name="exp_job-title" placeholder="Junior Developer - ABC Ltd (2017 - 2020)"></input>
       <label for="exp_job-description">Description</label>
       <textarea cols="50" rows="4"  required type="text" name="exp_job-description" placeholder="describe what you did at this job"></textarea>
       <button class="exp-del-btn" onclick="this.parentElement.parentElement.remove()" >Remove Experience</button>
    </div>
    `;

  experience_list.appendChild(li);
});

const add_education_btn = document.getElementById(
  "add-education-btn"
) as HTMLButtonElement;

const education_list = document.getElementById(
  "education-list"
) as HTMLUListElement;

add_education_btn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div style="margin-bottom: 1rem" class="flex flex-col">
       <label for="edu_qualification">Qualification</label>
       <input style="width: 100%" required type="text" name="edu_qualification" placeholder="Bachelor of Science in Computer Science"></input>
       <label for="edu_institution">Institution</label>
       <input style="width: 100%" required type="text" name="edu_institution" placeholder="University of Technology (2013 - 2017)"></input>

       <button class="exp-del-btn" onclick="this.parentElement.parentElement.remove()" >Remove Education</button>
    </div>
    `;

  education_list.appendChild(li);
});

const add_skill_btn = document.getElementById(
  "add-skill-btn"
) as HTMLButtonElement;

const skill_list = document.getElementById("skill-list") as HTMLUListElement;

add_skill_btn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="flex flex-col">
       <label for="skill_name">Skill Name</label>
       <input style="width: 100%" required type="text" name="skill_name" placeholder="HTML, CSS, JavaScript"></input>
       <button class="exp-del-btn" onclick="this.parentElement.parentElement.remove()" >Remove Skill</button>
    </div>
    `;

  skill_list.appendChild(li);
});

const add_certification_btn = document.getElementById(
  "add-certification-btn"
) as HTMLButtonElement;

const certification_list = document.getElementById(
  "certification-list"
) as HTMLUListElement;

add_certification_btn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="flex flex-col">
       <label for="cert">Certification</label>
       <input style="width: 100%" required type="text" name="cert" placeholder="Certified JavaScript Developer - Udemy"></input>

       <button class="exp-del-btn" onclick="this.parentElement.parentElement.remove()" >Remove Certification</button>
    </div>
    `;

  certification_list.appendChild(li);
});

const resume_form = document.getElementById("resume-form") as HTMLFormElement;

resume_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(resume_form);

  const name = formData.get("name") as string;
  const job = formData.get("job") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const linkedin = formData.get("linkedin") as string;
  const about = formData.get("about") as string;

  const experiences = Array.from(experience_list.children).map((li) => {
    const jobTitle = (
      li.querySelector("input[name='exp_job-title']") as HTMLInputElement
    ).value;
    const description = (
      li.querySelector(
        "textarea[name='exp_job-description']"
      ) as HTMLTextAreaElement
    ).value;

    return {
      jobTitle,
      description,
    };
  });

  const educations = Array.from(education_list.children).map((li) => {
    const qualification = (
      li.querySelector("input[name='edu_qualification']") as HTMLInputElement
    ).value;
    const institution = (
      li.querySelector("input[name='edu_institution']") as HTMLInputElement
    ).value;

    return {
      qualification,
      institution,
    };
  });

  const skills = Array.from(skill_list.children).map((li) => {
    const skillName = (
      li.querySelector("input[name='skill_name']") as HTMLInputElement
    ).value;

    return {
      skillName,
    };
  });

  const certifications = Array.from(certification_list.children).map((li) => {
    const certification = (
      li.querySelector("input[name='cert']") as HTMLInputElement
    ).value;

    return {
      certification,
    };
  });

  // console.log({ name, job, email, phone, linkedin, about });
  // console.log(experiences);
  // console.log(educations);
  // console.log(skills);
  // console.log(certifications);

  const resumeMarkup = generateResumeMarkup({
    name,
    job,
    email,
    phone,
    linkedin,
    about,
    experiences,
    educations,
    skills,
    certifications,
  });

  showResumeHeading();
  document.getElementById("resume-container")!.innerHTML = resumeMarkup;
});

const resume_heading = document.getElementById(
  "resume-heading"
) as HTMLHeadingElement;
function showResumeHeading() {
  resume_heading.style.display = "block";
}
function hideResumeHeading() {
  resume_heading.style.display = "none";
}

type ResumeConfig = {
  name: string;
  job: string;
  email: string;
  phone: string;
  linkedin: string;
  about: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  certifications: Certification[];
};

type Experience = {
  jobTitle: string;
  description: string;
};

type Education = {
  qualification: string;
  institution: string;
};

type Skill = {
  skillName: string;
};

type Certification = {
  certification: string;
};

function generateResumeMarkup(c: ResumeConfig) {
  const {
    name,
    job,
    email,
    phone,
    linkedin,
    about,
    experiences,
    educations,
    skills,
    certifications,
  } = c;

  console.log({ name, job, email, phone, linkedin, about });
  console.log(experiences);
  console.log(educations);
  console.log(skills);
  console.log(certifications);

  return `
    <div class="container">
      <div class="header">
        <h1>${name}</h1>
        <p>${job}</p>
        <p>
          Email: ${email} | Phone: ${phone} | LinkedIn: ${linkedin}
        </p>
      </div>

      <!-- About -->
      <div class="section">
        <h2 onclick="toggleSection('about')">About Me</h2>
        <div id="about" class="content">
          <p>
            ${about}
          </p>
        </div>
      </div>

      <!-- Work Exp -->
     ${
       experiences.length !== 0
         ? `
           <div class="section">
        <h2 onclick="toggleSection('work')">Work Experience</h2>
        <div id="work" class="content">

        ${experiences
          .map(
            (e) => `<h3>${e.jobTitle}</h3><ul><li>${e.description}</li></ul>`
          )
          .join("")}

        <!--  
        <h3>Senior Developer - XYZ Corp (2020 - Present)</h3>
          <ul>
            <li>
              Lead a team of developers to build scalable web applications using
              React and Node.js.
            </li>
            <li>
              Implemented CI/CD pipeline, reducing deployment time by 30%.
            </li>
          </ul>

          <h3>Junior Developer - ABC Ltd (2017 - 2020)</h3>
          <ul>
            <li>
              Worked on creating interactive UI components with Angular and
              improving backend APIs with Node.js.
            </li>
            <li>
              Collaborated with cross-functional teams to deliver projects on
              time.
            </li>
          </ul>
          -->
        </div>
      </div>`
         : ""
     }

      <!-- Education -->
          ${
            educations.length !== 0
              ? `
            <div class="section">
              <h2 onclick="toggleSection('education')">Education</h2>
              <div id="education" class="content">
                ${educations
                  .map(
                    (e) => `<h3>${e.qualification}</h3><p>${e.institution}</p>`
                  )
                  .join("")}
              </div>
            </div>`
              : ""
          }

      <!-- Skills -->
                  ${
                    skills.length !== 0
                      ? `
            <div class="section">
              <h2 onclick="toggleSection('skills')">Skills</h2>
              <div id="skills" class="content">
                <ul>
                  ${skills.map((e) => `<li>${e.skillName}</li>`).join("")}
                </ul>
              </div>
            </div>`
                      : ""
                  }

      <!-- Certifications -->
      
          ${
            certifications.length !== 0
              ? `
            <div class="section">
              <h2 onclick="toggleSection('certifications')">Certifications</h2>
              <div id="certifications" class="content">
                <ul>
                  ${certifications
                    .map((e) => `<li>${e.certification}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>`
              : ""
          }





    </div>
  `;
}
