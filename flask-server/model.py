import requests
from PIL import Image
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from io import BytesIO
def compare_images(imgurl1, imgurl2):
    try:
        # Fetch the images from the URLs
        img1 = Image.open(BytesIO(requests.get(imgurl1).content))
        img2 = Image.open(BytesIO(requests.get(imgurl2).content))

        # Convert images to grayscale
        img1_gray = np.array(img1.convert('L'))
        img2_gray = np.array(img2.convert('L'))

        # Resize images to the same size (required for SSIM calculation)
        img1_gray = cv2.resize(img1_gray, (img2_gray.shape[1], img2_gray.shape[0]))

        # Compute SSIM between the two images
        similarity_index, _ = ssim(img1_gray, img2_gray, full=True)

        # Return the similarity score
        return similarity_index

    except Exception as e:
        # Return an error message if anything goes wrong
        return {"error": str(e)}
