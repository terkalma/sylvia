from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')
