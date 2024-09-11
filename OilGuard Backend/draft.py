from flask import Flask, render_template, jsonify, request
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initial coordinates (latitude, longitude)
initial_lat = 12.9716
initial_lon = 77.5946

# Generate concentric circular path points to cover the area closely
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
            angle += math.pi / 10  # Change angle to create a spiral effect
        paths.append(path)
    return paths

@app.route('/')
def index():
    return render_template('test.html')

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

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=5007)
