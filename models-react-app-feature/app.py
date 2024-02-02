from flask import Flask, render_template,request, Response, abort
from flask_migrate import Migrate
from urllib.parse import quote  
import sys
import os
from database import db
project_dir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(1, os.path.join(os.getcwd(), "models"))
sys.path.insert(1, os.path.join(os.getcwd(), "routes"))
import uuid
from sqlalchemy import and_

from models.Users import User

from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

import routes.folderRoutes
import routes.jobRoutes
import routes.projectRoutes
import routes.queries   

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:%s@203.101.178.74/fastdata" % quote('admin')
db.init_app(app)    
Migrate(app, db)

    
### DATABASE MODELS
from models.Users import db
from models.Jobs import db
from models.JobType import db
from models.Projects import db
from models.Folders import db 
from models.TimeConditionType import db
from models.JobsScheduledType import db
from models.JobsScheduled import db
from models.JobTableAction import db
from models.JobWriteMode import db
from models.JobProperty import db

### ENDPOINTS
@app.route('/')
def index():
	return render_template("login.html")

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User(id=str(uuid.uuid4()), username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return Response("Success", status=200, mimetype='application/json')
    else:
        return Response("Failed", status=500, mimetype='application/json')
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = authenticate_user(username, password)

        if user:
            return Response("", status=200)
        else:
            abort(401, description="Error message you want the reader to receive.")

    return render_template('login.html')

@app.route('/chartjs.html')
def chart():
	return render_template("chartjs.html")

### Methods
def authenticate_user(username, password):
    user = User.query.filter(and_(User.username == username, User.password == password)).first()
    if user:
         return True
    return False


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
