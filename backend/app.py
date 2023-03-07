import cv2 as cv
from flask import Flask, request
from cartoon import Cartoon
from flask_cors import CORS
import base64
import os
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


@app.route("/api/", methods=["POST"])
def hello():
    try:
        formData = request.data
        with open("image.png", "ab") as file:
            file.write(formData)
        cartoon = Cartoon()
        cartoon.image_to_cartoon(image="image.png")
        os.remove("image.png")
        image = b""
        with open("cartoon.png", "rb") as file:
            image = file.read()
        os.remove("cartoon.png")
        return base64.b64encode(image)
    except:
        return {"status": 200, "message": "Something went wrong"}
