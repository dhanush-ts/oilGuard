from flask import Flask, render_template, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import os
import json
import requests
import math
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from bs4 import BeautifulSoup
import pickle 
import pandas as pd
import matplotlib.pyplot as plt
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
import cv2
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
from keras.applications.vgg16 import preprocess_input as vgg16_preprocess
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

initial_lat = 12.9716
initial_lon = 77.5946



with open('model.pkl', 'rb') as file:
    data = pickle.load(file)
    
with open('isoforest_final.pkl','rb') as file:
    iso_forest = pickle.load(file)

with open('scaler_final.pkl','rb') as file:
    scaler = pickle.load(file)

with open('le_final.pkl','rb') as file:
    le = pickle.load(file)

def load_models():
    global vgg16_model, svm_model
    try:
        vgg16_model = load_model('VGG16.keras')
        with open('model.pkl', 'rb') as f:
            svm_model = pickle.load(f)
    except Exception as e:
        print("Error loading models:", e)

load_models()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def detect_oil_spill(image_path):    
    detection_occurred = True
    processed_image_path = 'static/images/spill.jpg' 
    return detection_occurred, processed_image_path

def generate_circular_path(center_lat, center_lon, num_points_per_circle=40, num_circles=20, radius_increment=0.00002):
    points = []
    for i in range(num_circles):
        radius = (i + 1) * radius_increment
        for j in range(num_points_per_circle):
            angle = 2 * math.pi * (j / num_points_per_circle)  # Full circle
            lat = center_lat + radius * math.cos(angle)
            lon = center_lon + radius * math.sin(angle)
            points.append({'lat': lat, 'lon': lon})
    return points

def generate_spiral_path2(center_lat, center_lon, num_points=145, radius_increment=0.000005):
    points = []
    angle = 0
    for i in range(num_points):
        angle += math.pi / 8  # Reduce angle increment for tighter spirals
        radius = i * radius_increment
        lat = center_lat + radius * math.cos(angle)
        lon = center_lon + radius * math.sin(angle)
        points.append({'lat': lat, 'lon': lon})
    return points

def generate_swarm_paths(center_lat, center_lon, num_asvs=6, num_points=100, radius_increment=0.00001):
    paths = []
    for i in range(num_asvs):
        angle_offset = (2 * math.pi / num_asvs) * i
        path = []
        angle = angle_offset
        for _ in range(num_points):
            radius = radius_increment * _
            lat = center_lat + radius * math.cos(angle)
            lon = center_lon + radius * math.sin(angle)
            path.append({'lat': lat, 'lon': lon})
            angle += math.pi / 10  
        paths.append(path)
    return paths

def predict_single_image(image_path):
    image = preprocess_image(image_path)
    if image is None:
        return
    image_features = vgg16_model.predict(np.expand_dims(image, axis=0))
    image_features = image_features.reshape(1, -1)
    prediction = svm_model.predict(image_features)
    class_names = {0:'no spill',1:'spill'}
    predicted_class_name = class_names.get(prediction[0], "Unknown")
    
    print(f"Predicted class: {predicted_class_name}")
    return predicted_class_name

def preprocess_image(image_path, target_size=(224, 224)):
    image = cv2.imread(image_path)
    if image is None:
        print(f"Warning: Unable to read image at {image_path}")
        return None
    image = cv2.resize(image, target_size)
    image = preprocess_input(image)  # Preprocess image for VGG16
    return image

def map_stage(spill,path):
    if spill == 1:
        image_path = path
        original_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        # original_image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
        if original_image is None:
            return "Image not found"
        image_normalized = cv2.normalize(original_image, None, 0, 255, cv2.NORM_MINMAX)

        # Histogram equalization
        image_equalized = cv2.equalizeHist(image_normalized)

        # Apply color map
        color_mapped_image = cv2.applyColorMap(image_equalized, cv2.COLORMAP_JET)

        # Convert to HSV
        hsv_image = cv2.cvtColor(color_mapped_image, cv2.COLOR_BGR2HSV)

        # Define blue color range
        lower_blue = np.array([100, 150, 0])
        upper_blue = np.array([140, 255, 255])

        # Create a mask for blue color
        blue_mask = cv2.inRange(hsv_image, lower_blue, upper_blue)

        # Find contours
        contours, _ = cv2.findContours(blue_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        print("block 1")
        if contours:
            # Find the longest contour
            longest_contour = max(contours, key=cv2.contourArea)

            # Create an empty image for the contour
            contour_img = np.zeros_like(original_image)

            # Draw the longest contour
            cv2.drawContours(contour_img, [longest_contour], -1, (255), 2)

            # Convert contour image to RGB
            contour_img_rgb = cv2.cvtColor(contour_img, cv2.COLOR_GRAY2RGB)

            # Convert original image to RGB
            original_image_rgb = cv2.cvtColor(original_image, cv2.COLOR_GRAY2RGB)

            # Ensure images are the same size before overlay
            if original_image_rgb.shape != contour_img_rgb.shape:
                return "Size mismatch"

            # Create overlay image
            overlay_img = cv2.addWeighted(original_image_rgb, 0.7, contour_img_rgb, 0.3, 0)

            # Create a directory for detections if it doesn't exist
            detection_dir = 'static/uploads'
            if not os.path.exists(detection_dir):
                os.makedirs(detection_dir)

            # Generate a timestamped filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            output_filename = f'detected_{timestamp}.png'
            output_path = os.path.join(detection_dir, output_filename)
            cv2.imwrite(output_path, overlay_img)
            print(output_path)
            return output_path
        
    else:
        return "failed"
    
# image_path = "D:/OilGuard/test/1/0_0_0_img_FIgrkenaBa8qai9A_JAV_cls_1.jpg"
# predicted_class = predict_single_image(image_path)


esp32_ip = "http://192.168.137.224"


#---------------------------------------------------------------------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route('/path', methods=['GET'])
def get_path():
    path = generate_circular_path(initial_lat, initial_lon)
    return jsonify(path)

@app.route('/path2', methods=['GET'])
def get_path2():
    path2 = generate_spiral_path2(initial_lat, initial_lon)
    return jsonify(path2)


@app.route('/swarm_paths')
def get_swarm_paths():
    return render_template('test.html')

@app.route("/confirm_detection", methods=["POST"])
def confirm_detection():
    detection_status = request.form.get("detection")
    if detection_status == "true":
        try:
            response = requests.get(f"{esp32_ip}/confirmation_on")
            if response.status_code == 200:
                print("started...")
                return "Process started on ESP32."
            else:
                print("failed...")
                return f"Failed to communicate with ESP32. Status code: {response.status_code}"
        except requests.exceptions.RequestException as e:
            print("failed...2")
            return f"Error communicating with ESP32: {e}"
    else:
        print("failed...1")
        return "No detection confirmed."
    
@app.route("/confirm_detection1", methods=["POST"])
def confirm_detection1():
    try:
        response = requests.get(f"{esp32_ip}/confirmation_on")
        return "Process started on ESP32."
    except requests.exceptions.RequestException as e:
        print("failed...2")
        return f"Error communicating with ESP32: {e}"


@app.route('/homepage',methods=['GET', 'POST'])
def homepage():
    detection_status = None
    detection_image = None
    detection_details ={}
    alert_triggered = False
    asv_image = 'static/images/ais.jpeg'  
    world_map_image = 'static/images/world.jpeg'  
    if request.method == 'POST':
        # Check if the file is uploaded
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Read the image file
            img = image.load_img(file_path, target_size=(224, 224))
            img_array = image.img_to_array(img)

                # Expand the dimensions to match the input shape of VGG16
            img_array_expanded = np.expand_dims(img_array, axis=0)

                # Preprocess the image for VGG16
            img_array_preprocessed = vgg16_preprocess(img_array_expanded)

                # Make predictions using VGG16
            vgg16_predictions = vgg16_model.predict(img_array_preprocessed)

                # Flatten the predictions
            vgg16_predictions_flat = vgg16_predictions.flatten().reshape(1, -1)

                # Pass the predictions through SVM model
            svm_predictions = svm_model.predict(vgg16_predictions_flat)
            print(file_path)
                # Map the predictions to stage labels
            print(svm_predictions[0])
            detection_path = map_stage(svm_predictions[0],file_path)
            if detection_path == "failed":
                detect_status  = False
            else:
                detect_status = True
            detection_occurred = True
            print(detection_path,"sisebf")
            print("above")
            if detection_occurred:
                detection_status  = detect_status
                detection_image = detection_path
                detection_details = {
                    'latitude': '13.0827 N',
                    'longitude': '80.2707 E',
                    'location': 'Chennai Coast',
                    'depth': '15 meters',
                    'ais_number': '123456789',
                    'current_weather': 'Sunny',
                    'air_direction': 'Northeast'
                }
                alert_triggered = True
            else:
                detection_status = "No detection occurs"

    return render_template('home.html', detection_status=detection_status, 
                           detection_image=detection_image, asv_image=asv_image,
                           world_map_image=world_map_image,detection_details=detection_details,
                           alert_triggered=alert_triggered)

@app.route('/stop_alert', methods=['POST'])
def stop_alert():
    return '', 204  

@app.route('/oil_guard')
def oil_guard():
    return render_template('oilguard.html')

current_status = "Waiting for updates..."

@app.route('/update_status', methods=['POST'])
def update_status():
    global current_status
    data = request.get_json()
    if 'status' in data:
        current_status = data['status']
    return '', 200

@app.route('/rover')
def rover():
    return render_template('rover.html', status=current_status)

@app.route('/api/vessels', methods=['GET'])
def get_vessels():
    # Get query parameters
    vessel_type = request.args.get('type', '-1')
    flag = request.args.get('flag', '-')
    url = f'https://www.vesselfinder.com/vessels?type={vessel_type}&flag={flag}'

    print(f"Requesting URL: {url}")  # Debugging: Print the URL being requested

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    }
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Error: Received status code {response.status_code}")  # Debugging: Print error status code
        return jsonify({'error': 'Failed to retrieve data from Vessel Finder'}), response.status_code

    soup = BeautifulSoup(response.text, 'html.parser')
    vessel_rows = soup.find_all('tr')

    vessels = []

    for vessel in vessel_rows:
        columns = vessel.find_all('td')
        if columns:
            try:
                name = columns[0].find('div', class_='slna').text.strip()
                link = columns[0].find('a')['href']
                full_link = f"https://www.vesselfinder.com{link}"
                tanker_type = columns[0].find('div', class_='slty').text.strip()
                img_tag = columns[0].find('img', class_='content')
                img_src = img_tag['data-src'] if img_tag and 'data-src' in img_tag.attrs else 'No image available'

                year_built = columns[1].text.strip() if len(columns) > 1 else 'N/A'
                gt = columns[2].text.strip() if len(columns) > 2 else 'N/A'
                dwt = columns[3].text.strip() if len(columns) > 3 else 'N/A'
                size = columns[4].text.strip() if len(columns) > 4 else 'N/A'

                vessels.append({
                    'name': name,
                    'link': full_link,
                    'tanker_type': tanker_type,
                    'year_built': year_built,
                    'gt': gt,
                    'dwt': dwt,
                    'size': size,
                    'image_source': img_src
                })
            except Exception as e:
                print(f"Error parsing vessel data: {e}")  # Debugging: Print parsing errors

    if not vessels:
        vessels.append({
            'name': 'Example Vessel',
            'link': 'https://www.example.com',
            'tanker_type': 'Example Type',
            'year_built': '2000',
            'gt': '100000',
            'dwt': '200000',
            'size': '300 / 50',
            'image_source': 'https://www.example.com/example.jpg'
        })

    return jsonify(vessels)



@app.route('/anomaly', methods=['POST'])
def anomaly():
    # Get the form data
    lat = request.form.get('lat')
    lon = request.form.get('lon')
    ns = request.form.get('ns')
    sog = request.form.get('sog')
    cog = request.form.get('cog')
    heading = request.form.get('heading')
    rot = request.form.get('rot')
    drought = request.form.get('drought')

    # Create a list from the form data
    data_list = [float(lat), float(lon), ns, float(sog), float(cog), float(heading), float(rot), float(drought)]
    
    # Print the list (for debugging purposes)
    print(data_list)
    
    # Simulate anomaly detection logic
    status,lat,lon = some_condition_based_on(data_list)
    return jsonify({'is_anomaly': status, 'latitude': lat, 'longitude':lon})

# Define your condition here
def some_condition_based_on(vessel_data):
    labels = {0:'At anchor',1:'Constrained by her draught',2:'Moored',3:'Under way using engine'}
    vessel_data[4:6] = [abs(vessel_data[4] - vessel_data[5])]
    vessel_data[2] = le.transform([vessel_data[2]])[0]
    if vessel_data[2] in [0,2]:
        print(f"The ship is {labels[vessel_data[2]]}")
        return None, None, None
    # Load the model and other necessary object
    
    # Convert the vessel data into a DataFrame
    vessel_df = pd.DataFrame([vessel_data], columns=['Latitude', 'Longitude', 'Navigational status', 'SOG', 'drift', 'ROT', 'Draught'])
    vessel_test = vessel_df.drop(columns=['Latitude','Longitude'])
    
    # Labelencode the navigational status
    # vessel_df['Navigational status'] = le.transform(vessel_df['Navigational status'])
    # Normalize the data
    X_scaled_vessel = scaler.transform(vessel_test)
    
    # Predict the anomaly
    prediction = iso_forest.predict(X_scaled_vessel)
    
    is_anomaly = prediction[0] == -1
    
    # If it's an anomaly, return the latitude and longitude
    if is_anomaly:
        latitude = vessel_df['Latitude'].iloc[0]
        longitude = vessel_df['Longitude'].iloc[0]
        print("anomoly")
        print(latitude,longitude)
        return 'Yes', latitude,longitude
    else:
        print("not an anomoly")
        return 'No', None, None


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5005)
