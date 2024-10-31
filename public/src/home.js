import { renderPage } from '../router.js';
import eventManager from './module/events.js';
import { homeStyles } from './assets/styles/home.js';
import { infoContent } from './assets/info.js';
import { skillsContent } from './assets/skills.js';
import { projectStyles, initializeProjects } from './assets/projects.js';

export default function renderHomePage() {
    const bodyContent = `
      <style>
        ${homeStyles}
        ${projectStyles}
      </style>

      <div class="main-hero">
         <h1>Welcome to Positive Vibe's Portfolio</h1>
         <div class="description-container">
             <p id="fullText" style="display:none;">
                 I am a passionate developer specializing in backend development and scripting, with a strong focus on creating efficient and scalable applications. Though I developed this site to showcase my portfolio using a custom framework I built myself, my primary expertise lies in backend solutions and scripting. I thrive on building robust server-side applications and APIs that enhance user experiences. I am constantly exploring new technologies and methodologies to improve my skills and deliver high-quality software.
             </p>
             <p id="shortText">
                 I am a passionate developer specializing in backend development and scripting, with a strong focus on creating efficient...
                 <span class="toggle-text" id="seeMore">See more</span>
             </p>
         </div>
         <div class="icon-wrapper">
             <div class="icon-item outlined-icon" title="Info" id="infoIcon">
                 <span class="material-icons">call_to_action</span>
             </div>
             <div class="icon-item outlined-icon" title="Projects" id="projectsIcon">
                 <span class="material-icons">folder_special</span>
             </div>
             <div class="icon-item outlined-icon" title="Skills" id="skillsIcon">
                 <span class="material-icons">stars</span>
             </div>
         </div>

         ${infoContent}
         <div id="projectsContainer" class="popup-box">
             <div id="projectList"></div>
         </div>
         ${skillsContent}
     </div>
    `;

    renderPage({
      showHeader: false,
      showFooter: false,
      bodyContent,
    });

    eventManager.registerEvents();
    initializeProjects();

    document.getElementById('infoIcon').addEventListener('click', function(event) {
      event.stopPropagation();
      const popup = document.getElementById('infoContainer');
      popup.classList.toggle('active');
      closeOtherPopups('infoContainer');
    });

    document.getElementById('projectsIcon').addEventListener('click', function(event) {
      event.stopPropagation();
      const popup = document.getElementById('projectsContainer');
      popup.classList.toggle('active');
      closeOtherPopups('projectsContainer');
    });

    document.getElementById('skillsIcon').addEventListener('click', function(event) {
      event.stopPropagation();
      const popup = document.getElementById('skillsContainer');
      popup.classList.toggle('active');
      closeOtherPopups('skillsContainer');
    });

    function closeOtherPopups(activeId) {
      const popupContainers = document.querySelectorAll('.popup-box');
      popupContainers.forEach(container => {
          if (container.id !== activeId) {
               container.classList.remove('active');
           }
       });
    }

    document.addEventListener('click', function(event) {
      const popupContainers = document.querySelectorAll('.popup-box.active');
      popupContainers.forEach(popup => {
          if (!popup.contains(event.target)) {
              popup.classList.remove('active');
          }
      });
    });

    const fullText = document.getElementById('fullText');
    const shortText = document.getElementById('shortText');
    const seeMore = document.getElementById('seeMore');
    const descriptionContainer = document.querySelector('.description-container');

    function toggleText() {
      const isExpanded = fullText.style.display === 'block';
      fullText.style.display = isExpanded ? 'none' : 'block';
      shortText.style.display = isExpanded ? 'block' : 'none';
      seeMore.textContent = isExpanded ? 'See more' : 'See less';
      descriptionContainer.classList.toggle('expanded');
    }

    seeMore.addEventListener('click', toggleText);
}