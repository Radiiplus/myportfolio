export const homeStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .main-hero {
        background-image: url('src/assets/img/hero.jpg');
        background-size: cover;
        background-position: center;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        color: white;
        text-align: center;
        padding-bottom: 20%;
        background-color: rgba(0, 0, 0, 0.7);
        background-blend-mode: darken;
    }

    .main-hero h1 {
        font-size: 3em;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .description-container {
        width: 100%;
        max-height: 15vh;
        overflow: hidden;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
        margin-bottom: 20px;
        font-size: 1.2em;
        transition: max-height 0.5s ease-out;
        overflow-y: auto;
    }

    .description-container.expanded {
        max-height: 500px;
    }

    .toggle-text {
        color: #fff;
        text-decoration: underline;
        cursor: pointer;
    }

    .icon-wrapper {
        display: flex;
        gap: 20px;
        margin-top: 20px;
        margin-bottom: 20%;
    }

    .icon-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px; 
        height: 50px;
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s;
        color: white;
        font-size: 36px;
    }

    .icon-item:hover {
        transform: scale(1.1);
    }

    .outlined-icon {
        background-color: transparent;
    }
    
    .popup-box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.99);
        color: black;
        padding: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px; 
        display: flex; 
        align-items: flex-start; 
        justify-content: center; 
        font-size: 1.2em; 
        transition: transform 0.5s ease; 
        transform: translateY(100%);
        z-index: 1000; 
    }

    .popup-box.active {
       transform: translateY(0); 
    }

    #infoContainer {
       height:auto; 
       height :15%;
       overflow-y:auto; 
       padding-top: 10%;
    }
    
    #projectsContainer {
       height:auto; 
       height :80%; 
       overflow-y:auto; 
    }
    
    #skillsContainer {
       height:auto; 
       height :43%; 
       overflow-y:auto;
    }
    
    .social-icons img {
            width: 50px; 
            height: 50px; 
            object-fit: cover; 
            margin: 0 10px; 
            border-radius: 50%;
        }

        .skills-section {
            font-size: 16px;
            line-height: 1.6;
            transition: transform 0.3s ease; 
        }

        .skills-section:hover {
            transform: scale(1.02);
        }

        .skills-section h2 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5%; 
            color: #333;
            border-bottom: 2px solid #007bff; 
            padding-bottom: 5px; 
        }

        .skills-section ul {
            list-style: none;
            padding: 0;
        }

        .skills-section li {
            position: relative; 
            padding-left: 20px; 
            padding-bottom: 3%;
        }

        .skills-section li::before {
            content: '• ';
            color: #007bff;
            font-weight: bold;
            position: absolute; 
            left: 0; 
        }

        .skills-section strong {
            color: #007bff;
        }

    @media (max-width: 768px) {
       .main-hero {
           justify-content:flex-end; 
           text-align:left; 
           padding :20px; 
       }
       .description-container {
           text-align:left; 
       }
   }
`;