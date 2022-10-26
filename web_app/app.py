import json

from flask import request
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
from wtforms.validators import InputRequired
import librosa
import math

app = Flask(__name__,template_folder="/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/templates")
app.config['SECRET_KEY'] = 'csmusicfyp'
app.config['UPLOAD_FOLDER'] = '/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files'

SAMPLE_RATE = 22050
# DURATION = 30 # seconds
# SAMPLES_PER_TRACK = SAMPLE_RATE * DURATION
class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")


# def save_mfcc(file, json_path, n_mfcc=13, n_fft=2048, hop_length=512, num_segments=5):
    
#     num_samples_per_segment = int(SAMPLES_PER_TRACK / num_segments)
#     expected_mfcc_vec_per_segment = math.ceil(num_samples_per_segment / hop_length)
#     signal, sr = librosa.load(file, sr=SAMPLE_RATE)
                    
#     # process segments extracting mfcc and storing data
#     for s in range(num_segments):
#         start_sample = num_samples_per_segment * s
#         finish_sample = start_sample + num_samples_per_segment 
        
#         mfcc = librosa.feature.mfcc(y = signal[start_sample:finish_sample],
#                                 sr = sr,
#                                 n_fft = n_fft,
#                                 n_mfcc = n_mfcc,
#                                 hop_length = hop_length)
        
#         mfcc = mfcc.T

@app.route('/', methods=['GET',"POST"])
def index():
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data # First grab the file
        print (file)
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) # Then save the file
        print(file.filename)
        return "File has been uploaded."
    return render_template('index.html',form=form)

# @app.route('/uploader', methods = ['GET', 'POST'])
# def upload_file():
#    if request.method == 'POST':
#       f = request.files['file']
#       f.save(secure_filename(f.filename))
#       return 'file uploaded successfully'

@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    # print(output) # This is the output that was stored in the JSON within the browser
    # print(type(output))
    result = json.loads(output) #this converts the json output to a python dictionary
    print(result) # Printing the new dictionary
    # print(type(result))#this shows the json converted as a python dictionary
    return result


if __name__ == '__main__':
    app.run(debug=True)