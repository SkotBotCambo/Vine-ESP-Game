from flask import Flask, render_template
import requests
import json

app = Flask(__name__)

# vine stuff

global video_urls
video_urls = []
vine_url = 'https://api.vineapp.com/timelines/popular'

def get_video_urls():
    global video_urls
    r = requests.get(vine_url)
    video_urls = urls = [str(x['videoLowURL']) for x in r.json()['data']['records']]

@app.route('/')
def main():
    return render_template("layout.html")

@app.route('/get_vine/<id>')
def get_vine(id):
   return video_urls[int(id)]

if __name__ == '__main__':
    get_video_urls()
    app.debug = True
    app.run()

