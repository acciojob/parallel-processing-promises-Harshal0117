const imageUrls = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/200",
    "https://invalid-url.com/image.jpg" // Invalid URL to test error handling
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
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
        const images = await Promise.allSettled(imageUrls.map(downloadImage));
        loadingDiv.style.display = "none";
        
        images.forEach(result => {
            if (result.status === "fulfilled") {
                outputDiv.appendChild(result.value);
            } else {
                const errorMsg = document.createElement("p");
                errorMsg.textContent = result.reason.message;
                errorDiv.appendChild(errorMsg);
            }
        });
    } catch (error) {
        loadingDiv.style.display = "none";
        errorDiv.innerHTML = error.message;
    }
}

document.getElementById("btn").addEventListener("click", downloadImages);

