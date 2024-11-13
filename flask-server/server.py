from flask import Flask, request, jsonify
from model import compare_images  # Import the function from model.py

app = Flask(__name__)

# Route to return the list of members
@app.route('/members', methods=['GET'])
def get_members():
    return jsonify({"members": ["shreyansh", "suresh", "shreya"]})

# Route to compare two images based on their URLs
@app.route('/checkimg', methods=['GET'])
def check_images():
    # Get the image URLs from query parameters
    imgurl1 = request.args.get('imgurl1')
    imgurl2 = request.args.get('imgurl2')
    
    if not imgurl1 or not imgurl2:
        return jsonify({"error": "Both imgurl1 and imgurl2 are required"}), 400

    # Compare the images using the compare_images function
    similarity_index = compare_images(imgurl1, imgurl2)

    # If there's an error in comparison, return the error message
    if isinstance(similarity_index, dict) and 'error' in similarity_index:
        return jsonify(similarity_index), 500

    # Check if similarity is above 80%
    if similarity_index >= 0.8:
        return jsonify({"message": "OK", "similarity": similarity_index})
    else:
        return jsonify({"message": "Not OK", "similarity": similarity_index})

if __name__ == '__main__':
    app.run(debug=True)
