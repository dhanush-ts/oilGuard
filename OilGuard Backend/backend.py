from flask import Flask,jsonify,request
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from bs4 import BeautifulSoup
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('config.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return "working"
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not username or not password or not role:
        return jsonify({'error': 'Username, password, and role are required.'}), 400

    hashed_password = generate_password_hash(password)

    try:
        conn = sqlite3.connect('config.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO user_credentials (username, password, role) VALUES (?, ?, ?)',
                       (username, hashed_password, role))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User registered successfully.'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already exists.'}), 409


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required.'}), 400

    conn = sqlite3.connect('config.db')
    cursor = conn.cursor()
    cursor.execute('SELECT password, role FROM user_credentials WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user[0], password):
        return jsonify({'message': 'Login successful.', 'role': user[1]}), 200
    else:
        return jsonify({'error': 'Invalid username or password.'}), 401


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

if __name__ == '__main__':
    app.run(debug=True,port=5005,host='0.0.0.0')
