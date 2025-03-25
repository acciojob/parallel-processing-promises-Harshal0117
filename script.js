//your JS code here. If required.
const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300"
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
    });
}

async function downloadImages() {
    const outputDiv = document.getElementById("output");
    const errorDiv = document.getElementById("error");
    const loadingDiv = document.getElementById("loading");
    
    outputDiv.innerHTML = "";
    errorDiv.innerText = "";
    loadingDiv.style.display = "block";
    
    try {
        const images = await Promise.all(imageUrls.map(downloadImage));
        loadingDiv.style.display = "none";
        
        images.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
        loadingDiv.style.display = "none";
        errorDiv.innerText = error;
    }
}

downloadImages();
