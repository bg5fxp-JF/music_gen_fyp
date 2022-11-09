import json
import numpy as np
from flask import request
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
from wtforms.validators import InputRequired
import librosa
import math
import wave
import contextlib
import pickle
import joblib
from tensorflow import keras

app = Flask(__name__)
app.config['SECRET_KEY'] = 'csmusicfyp'
app.config['UPLOAD_FOLDER'] = '/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files'

#Load the trained model. (Pickle file)

model = keras.models.load_model("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/models/music_classifier_model.h5")


# SAMPLE_RATE = 22050
# DURATION = 30 # seconds
# SAMPLES_PER_TRACK = SAMPLE_RATE * DURATION
class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")


def save_mfcc(file, n_mfcc=13, n_fft=2048, hop_length=512, num_segments=10):
    
    with contextlib.closing(wave.open(file,'r')) as f:
        frames = f.getnframes()
        sample_rate = f.getframerate()
        duration = frames / float(sample_rate)
    # print(duration)

    samples_per_track = sample_rate * duration
    num_samples_per_segment = int(samples_per_track / num_segments)
    expected_mfcc_vec_per_segment = math.ceil(num_samples_per_segment / hop_length)
    signal, sr = librosa.load(file, sr=sample_rate)
                    
    # process segments extracting mfcc and storing data
    for s in range(num_segments):
        start_sample = num_samples_per_segment * s
        finish_sample = start_sample + num_samples_per_segment 
        
        mfcc = librosa.feature.mfcc(y = signal[start_sample:finish_sample],
                                sr = sr,
                                n_fft = n_fft,
                                n_mfcc = n_mfcc,
                                hop_length = hop_length)
        
        mfcc = mfcc.T

        if len(mfcc) == expected_mfcc_vec_per_segment:
            return mfcc.tolist()

@app.route('/', methods=['GET',"POST"])
def index():     
    identified_genre = ""
    recommended = ""
    filePath2 =""
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data # First grab the file
        
        filePath = os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
        filePath2 = "../static/files/" + file.filename
        file.save(filePath) # Then save the file
        mfcc = np.array(save_mfcc(filePath))
        # print(mfcc)
        # print(type(mfcc))
        X_test = mfcc.copy()
        X_test = X_test[... , np.newaxis]
        # add a dimension to input data for sample - model.predict() expects a 4d array in this case
        X = X_test.copy()
        
        X = X[np.newaxis, ...] # array shape (1, 130, 13, 1)
        
    
        # perform prediction
        prediction = model.predict(X)

        # get index with max value
        predicted_index = np.argmax(prediction, axis=1)

        pop = ['Pop','hiphop, r&b or reggaeton']
        metal = ['Metal','hiphop or drill']
        disco = ['Disco','r&b or reggaeton']
        blues = ['Blues','hiphop, r&b or drill']
        reggae = ['Reggae','hiphop, r&b or reggaeton']
        classical = ['Classical','hiphop or drill']
        rock = ['Rock','hiphop, r&b or drill']
        hiphop = ['Hiphop','r&b, reggaeton or drill']
        country = ['Country','... Actually I dont know what goes good with country 🤔 but feel free to try remix with anything :)']
        jazz = ['Jazz','hiphop, r&b, reggaeton or drill']
 
        # print (predicted_index)
        switcher={
            0:pop,
            1:metal,
            2:disco,
            3:blues,
            4:reggae,
            5:classical,
            6:rock,
            7:hiphop,
            8:country,
            9:jazz
        }
        selected = switcher.get((int)(predicted_index),"Can't Identify")
        n = len(selected)
        identified_genre = selected[0]
        recommended = 'Try remmixing with {}'.format(selected[1])
        
    return render_template('index.html',form=form,prediction_text = identified_genre,  recommend_text=recommended, filePath=filePath2)

# @app.route('/predict',methods=['GET',"POST"])
# def predict():
#     form = UploadFileForm()
#     if form.validate_on_submit():
#         file = form.file.data # First grab the file
        
#         filePath = os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
#         file.save(filePath) # Then save the file
#         mfcc = np.array(save_mfcc(filePath))
#         # print(mfcc)
#         # print(type(mfcc))
#         X_test = mfcc.copy()
#         X_test = X_test[... , np.newaxis]
#         # add a dimension to input data for sample - model.predict() expects a 4d array in this case
#         X = X_test.copy()
        
#         X = X[np.newaxis, ...] # array shape (1, 130, 13, 1)
        
    
#         # perform prediction
#         prediction = model.predict(X)

#         # get index with max value
#         predicted_index = np.argmax(prediction, axis=1)

#         pop = ['Pop','hiphop','r&b','reggaeton']
#         metal = ['Metal','hiphop','drill']
#         disco = ['Disco','r&b','reggaeton']
#         blues = ['Blues','hiphop','r&b','drill']
#         reggae = ['Reggae','hiphop','r&b','reggaeton']
#         classical = ['Classical','hiphop','drill']
#         rock = ['Rock','hiphop','r&b','drill']
#         hiphop = ['Hiphop','r&b','reggaeton','drill']
#         country = ['Country','None I dont like country... but feel free to try remix with anything :)']
#         jazz = ['Jazz','hiphop','r&b','reggaeton','drill']
#         # 0 - pop
#         # 1 - metal
#         # 2 - disco
#         # 3 - blues
#         # 4 - reggae
#         # 5 - classical
#         # 6 - rock
#         # 7 - hiphop
#         # 8 - country
#         # 9 - jazz

#         # print (predicted_index)
#         switcher={
#             0:pop,
#             1:metal,
#             2:disco,
#             3:blues,
#             4:reggae,
#             5:classical,
#             6:rock,
#             7:hiphop,
#             8:country,
#             9:jazz
#         }
#         selected = switcher.get((int)(predicted_index),"Can't Identify")
#         n = len(selected)
#         identified_genre = selected[0]
#         recommended = selected[1:n]
        
#     return render_template('index.html',form=form,prediction_text = identified_genre,  recommend_text='Try remmixing with {}'.format(recommended))



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