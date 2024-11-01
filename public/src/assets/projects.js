import { githubIcon, linkIcon } from './styles/icon.js';

export const projects = [
  {
    title: "Cnest Fullstack Web Dev Framework",
    fullDescription: `
      <p>Cnests is a robust, modular full-stack web development framework built with JavaScript and Node.js. It's designed to streamline development by integrating powerful backend and frontend features into a unified system, making it an ideal choice for building scalable web applications. This website was made with it and Riffconnect too.</p>
    `,
    images: ["src/assets/img/cnest1.png", "src/assets/img/cnest2.png"],
    gitUrl: "https://github.com/Radiiplus/cnest", 
    liveUrl: ""
  },
  {
    title: "RiffConnect Music Streaming Platform",
    fullDescription: `
      <h2>RiffConnect Overview</h2>
      <p>RiffConnect is a vibrant music community platform designed for users to connect, share, and explore music together. Featuring a unique blend of global chat and music streaming, RiffConnect allows users to engage with others while discovering new tunes and enjoying their favorites. The platform aims to create an immersive experience that unites music enthusiasts, fostering a shared love of music. Join RiffConnect to be part of a community that celebrates music and embark on an unforgettable journey together! It was developed with Cnest Framework</p>
    `,
    images: ["src/assets/img/riffdash.png", "src/assets/img/riffdash2.jpg"],
    gitUrl: "",
    liveUrl: "https://riffconnect.line.pm"
  },
  {
    title: "My Portfolio",
    fullDescription: `
      <h2>Portfolio Overview</h2>
      <p>This portfolio showcases my projects and skills as a web developer. The site was developed using the Cnest framework, which enabled me to efficiently integrate both frontend and backend functionalities. I aimed to create an intuitive and visually appealing experience for visitors to explore my work and understand my capabilities in full-stack web development.</p>
    `,
    images: ["src/assets/img/port1.jpg", "src/assets/img/port2.jpg"],
    gitUrl: "https://github.com/Radiiplus/myportfolio", 
    liveUrl: "https://localhost3k.web.app"
  }
];

export const projectStyles = `
.project-item {
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  display: flex; 
  flex-direction: column; 
  width: 90vw;
  overflow: hidden;
  border: 0.3px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.09);
  margin-bottom: 5%;
}

.project-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.project-item-header {
  font-weight: bold;
  font-size: 1.5em;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.project-item-header:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.project-item-short-description {
  font-size: 1em;
  color: rgba(0, 0, 0, 0.7);
  margin: 5px 0;
  background-color: rgba(0, 0, 0, 0.01);
}

.project-item-details {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding: 0 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border-top: 0.2px solid transparent;
}

.project-item-details.expanded {
  max-height: 2000px;
  opacity: 1;
  margin-top: 10px;
  padding: 10px;
  border-top-color: rgba(0, 0, 0, 0.2);
}

.carousel {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-in-out;
}

.project-item-details.expanded .carousel {
  opacity: 1;
  transform: translateY(0);
}

.carousel img {
  width: 30vw;
  height: 20vh;
  border-radius: 20px;
  margin-top: 5%;
  margin-bottom: 5%;
  transition: transform 0.3s ease;
}

.carousel img:hover {
  transform: scale(1.05);
}

.project-links {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-in-out;
}

.project-item-details.expanded .project-links {
  opacity: 1;
  transform: translateY(0);
}

.project-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  padding-left: 2%;
  padding-top: 2%;
  padding-bottom: 2%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.project-link:hover {
  transform: translateY(-2px);
}

.project-link img {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.project-link:hover img {
  transform: scale(1.1);
}
`;

export function initializeProjects() {
  const projectList = document.getElementById("projectList");
  
  const titleElement = document.createElement("h2");
titleElement.textContent = "Projects";
titleElement.style.textAlign = "center";
titleElement.style.fontSize = "1.5em"; 
titleElement.style.fontWeight = "bold"; 
titleElement.style.color = "#333"; 
titleElement.style.marginBottom = "20px"; 
titleElement.style.fontFamily = "'Arial', sans-serif"; 
projectList.appendChild(titleElement);

  const truncateDescription = (fullDescription, maxLength) => {
    const strippedHtml = fullDescription.replace(/<[^>]*>/g, '');
    if (strippedHtml.length <= maxLength) return strippedHtml;
    return strippedHtml.slice(0, maxLength) + '...';
  };

  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";

    const shortDescription = truncateDescription(project.fullDescription, 50);

    projectItem.innerHTML = `
      <div class="project-item-content">    
        <div class="project-item-header">${project.title}</div>
        <p class="project-item-short-description">${shortDescription}</p>
      </div>
      <div class="project-item-details">
        ${project.fullDescription}
        <div class="carousel">
          ${project.images.map(img => `<img src="${img}" alt="${project.title} image">`).join('')}
        </div>
        <div class="project-links">
          ${project.gitUrl ? `
          <a href="${project.gitUrl}" class="project-link" target="_blank">
            <img src="${githubIcon}" alt="GitHub">
            <span></span>
          </a>` : ''}
          ${project.liveUrl ? `
          <a href="${project.liveUrl}" class="project-link" target="_blank">
            <img src="${linkIcon}" alt="Live Demo">
            <span></span>
          </a>` : ''}
        </div>
      </div>
    `;

    const content = projectItem.querySelector(".project-item-content");
    const details = projectItem.querySelector(".project-item-details");

    content.addEventListener("click", () => {
      details.classList.toggle("expanded");
    });

    projectList.appendChild(projectItem);
  });
}
