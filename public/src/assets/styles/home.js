export const homeStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .rem {
    	height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        padding: 5%;
        text-align: left;
    }

    .rem h1 {
        font-size: 2.5em;
        margin-bottom: 10px;
        font-weight: bold;
        text-align: left; 
    }

    .description-container {
        width: 100%;
        max-height: 15vh;
        overflow: hidden;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
        margin-bottom: 20px;
        font-size: 15px;
        transition: max-height 0.5s ease-out;
        overflow-y: hidden;
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
        padding: 1%;
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
   	display: flex; 
       height: auto; 
       max-height :20%;
       overflow-y: auto; 
       justify-content: center;
       align-items: center;
       padding-top: 3%;
       
    }
    
    #projectsContainer {
       height:auto; 
       max-height: 80%; 
       overflow-y:auto; 
    }
    
    #skillsContainer {
       height:auto; 
       max-height: 43%; 
       overflow-y:auto;
       padding: 5%;
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

    @media (max-width: 1000px) {
       .rem {
           justify-content:flex-end; 
           text-align:left; 
           padding : 5%; 
       }
       .description-container {
           text-align:left; 
       }
   }
`;