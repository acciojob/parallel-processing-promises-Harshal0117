const imageUrls = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
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
    errorDiv.innerHTML = "";
    loadingDiv.style.display = "block";

    try {
        const images = await Promise.all(imageUrls.map(downloadImage));
        loadingDiv.style.display = "none";
        images.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
        loadingDiv.style.display = "none";
        errorDiv.innerHTML = error;
    }
}

document.getElementById("btn").addEventListener("click", downloadImages);

