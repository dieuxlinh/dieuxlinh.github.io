import { countryInfo } from './places.js';

// DOM elements
const panel = document.getElementById('panel'); 
const countryName = document.getElementById('panel-title'); 
const countryContent = document.getElementById('panel-content');
const closeBtn = document.querySelector('.close-btn');   
const countries = document.querySelectorAll('svg path');
const initialImg = document.getElementById('panel-initial-img');
const contentContainer = document.getElementById('panel-content-container');
const resetBtn = document.getElementById('reset-btn'); 

let activeCountry = null; 
let hoveredCountry = null; 

const paths = document.querySelectorAll('svg path');
paths.forEach(path => {
  path.addEventListener('mouseenter', () => {
    path.parentNode.appendChild(path);
    path.classList.add('hover');
  });

  path.addEventListener('mouseleave', () => {
    path.classList.remove('hover');
  });
});


// Panel visible at start with image, hide close button to start
panel.classList.add('panel-open');
initialImg.style.display = "block";
contentContainer.style.display = "none";
closeBtn.style.display = "none";

// Set reset button grey initially
resetBtn.classList.remove("active");

// Helper function: select all paths with same country name
function getCountryPaths(name) {
    return Array.from(countries).filter(c => c.getAttribute("name") === name);
}

// Helper: update reset button color
function updateResetButton() {
    const anyClicked = Array.from(countries).some(c => c.classList.contains("clicked") || c.classList.contains("active"));
    if (anyClicked) {
        resetBtn.classList.add('active'); // yellow
    } else {
        resetBtn.classList.remove('active'); // grey
    }
}

// Helper: update panel content
function showPanelForCountry(name) {
    if (!name) return;
    const info = countryInfo[name] || "No info yet for this country.";
  
    const paragraphs = info.split('<br>').map(line => {
        const trimmed = line.trim();
        const isCityLine = ['⟡', '♡', '⋆˙'].some(sym => trimmed.startsWith(sym));
        const className = isCityLine ? 'small-font' : '';
        return `<div class="${className}">${trimmed}</div>`;
      }).join('');
      
  
    countryName.textContent = name;
    countryContent.innerHTML = paragraphs;
  
    initialImg.style.display = "none";
    contentContainer.style.display = "block";
    closeBtn.style.display = "block";
  }
  


countries.forEach(country => {
    const countryNameAttr = country.getAttribute("name");
    if (!countryNameAttr) return;

    country.addEventListener("mouseenter", () => {
        getCountryPaths(countryNameAttr).forEach(c => c.classList.add("hover"));
        hoveredCountry = countryNameAttr;
        showPanelForCountry(countryNameAttr);
    });

    country.addEventListener("mouseout", () => {
        getCountryPaths(countryNameAttr).forEach(c => c.classList.remove("hover"));
        hoveredCountry = null;
        // Show corresponding panel
        if (activeCountry) {
            const activeName = activeCountry.getAttribute("name");
            showPanelForCountry(activeName);
        } else {
            initialImg.style.display = "block";
            contentContainer.style.display = "none";
            closeBtn.style.display = "none";
            countryName.textContent = '';
        }
    });

    // Click: mark as active
    country.addEventListener("click", function(e) {
        const clickedCountry = e.target.getAttribute("name");
        if (!clickedCountry) return;

        // Turn previous active country red
        if (activeCountry && activeCountry !== this) {
            getCountryPaths(activeCountry.getAttribute("name")).forEach(c => {
                c.classList.remove("active");
                c.classList.add("clicked");
            });
        }

        // Set this country as active (pink while panel open)
        getCountryPaths(clickedCountry).forEach(c => c.classList.add("active"));
        activeCountry = this;

        // Ensure panel shows clicked country
        showPanelForCountry(clickedCountry);

        // Update reset button color
        updateResetButton();
    });
});

// Close button: hide content, show initial image, mark active country red
closeBtn.addEventListener('click', () => {
    if (activeCountry) {
        const activeName = activeCountry.getAttribute("name");
        getCountryPaths(activeName).forEach(c => {
            c.classList.remove("active");
            c.classList.add("clicked");
        });
        activeCountry = null;
    }

    // Revert panel to initial image
    initialImg.style.display = "block";
    contentContainer.style.display = "none";
    closeBtn.style.display = "none";
    countryName.textContent = '';

    // Update reset button color
    updateResetButton();
});

// Reset button: remove all states and reset panel
resetBtn.addEventListener('click', () => {
    countries.forEach(p => {
        p.classList.remove("active", "clicked", "hover");
        p.classList.add("default");
    });

    activeCountry = null;

    initialImg.style.display = "block";
    contentContainer.style.display = "none";
    closeBtn.style.display = "none";
    countryName.textContent = '';

    updateResetButton();
});
