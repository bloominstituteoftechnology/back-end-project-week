import os
import sqlite3
import unittest

from flask import (Flask,  request, session, g, redirect, url_for, abort, render_template, flash)

app = Flask(__name__) # Start the instance
app.config.from_object(__name__) # Load config

# Load in default
app.config.update(
    DATABASE = os.path.join(app.root_path, "flaskr.db"),
    SECRET_KEY = b'_5#y2L"F4Q8z\n\xec/',
    USERNAME = "Admin",
    PASSWORD = "Default"
)
app.config.from_envvar("FLASR_SETTINGS", silent=True)

# Connect to the database
def connect_db():
    """ Connect to the databse """
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

# Prepare db for reading
def init_db():
    db = get_db()

    with app.open_resource("schema.sql",mode='r') as f:
        db.cursor().executescript(f.read())

    db.commit()

# Confirm db init
@app.cli.command("initdb")
def initdb_command():
    """ Initializes the database """
    init_db()
    print("Initialized the databse")

# Grab that database
def get_db():
    """ Opens a new database connectionn if 
        none exists for current app context"""
    if not hasattr(g, "sqlite_db"):
        g.sqlite_db = connect_db()
    return g.sqlite_db

# Handle the end of a request
@app.teardown_appcontext
def close_db(error):
    """ Closes the database once a request finishes """
    if hasattr(g, "sqlite_db"):
        g.sqlite_db.close()

# Route for "home"
@app.route('/')
def show_notes():
    db = get_db()
    cur = db.execute('select title, text from notes order by id desc')
    notes = cur.fetchall()
    return render_template("show_notes.html", notes=notes)

# Route for adding notes
@app.route('/add', methods=['POST'])
def add_note():
    if not session.get('logged_in'):
        abort(401)
    db = get_db()
    db.execute('insert into notes (title, text) values (?, ?)',
            [request.form['title'], request.form['text']])
    db.commit()
    flash("New note was succesfully posted")
    return redirect(url_for('show_notes'))

# Login & Logout
@app.route('/login', methods=['GET','POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != app.config['USERNAME']:
			error = "Bad Username"
		elif request.form['password'] != app.config['PASSWORD']:
			error = "Bad Password"
		else:
			sesion['logged_in'] = True
			flash("Successfully Logged In")
			return redirect(url_for('show_notes'))
	return render_template('login.html', error=error)
	
@app.route('/logout')
def logout():
	sesion.pop('logged_in', None)
	flash("Logged Out")
	return redirect(url_for('show_notes'))
		
