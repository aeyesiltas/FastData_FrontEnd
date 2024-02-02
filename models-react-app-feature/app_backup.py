from flask import Flask,render_template,request
import sqlite3

app = Flask(__name__)

def authenticate_user(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Kullanıcıyı veritabanından al
    cursor.execute('SELECT * FROM users WHERE user = ? AND password = ?', (username, password))
    user = cursor.fetchone()
    conn.close()
    return user

@app.route('/')
def index():
	return render_template("login.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = authenticate_user(username, password)

        if user:
            # Kullanıcı doğrulandı
            return render_template('index.html')
        else:
            # Kullanıcı doğrulanamadı
            return "Kullanıcı adı veya parola hatalı"

    return render_template('login.html')

@app.route('/chartjs.html')
def chart():
	return render_template("chartjs.html")


if __name__ == '__main__':

	app.run()







