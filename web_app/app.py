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
from pydub import AudioSegment
from spleeter.separator import Separator
import pickle
import joblib
from tensorflow import keras

app = Flask(__name__)
app.config['SECRET_KEY'] = 'csmusicfyp'
app.config['UPLOAD_FOLDER'] = '/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files'

#Load the trained model. (Pickle file)

model = keras.models.load_model("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/models/music_classifier_model.h5")


SAMPLE_RATE = 22050
DURATION = 30 # seconds
SAMPLES_PER_TRACK = SAMPLE_RATE * DURATION
class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")




def save_mfcc(file, n_mfcc=13, n_fft=2048, hop_length=512, num_segments=10):
    
    # with contextlib.closing(wave.open(file,'r')) as f:
    #     frames = f.getnframes()
    #     sample_rate = f.getframerate()
    #     duration = frames / float(sample_rate)
    # print(duration)

    # samples_per_track = sample_rate * duration
    
    num_samples_per_segment = int(SAMPLES_PER_TRACK / num_segments)
    expected_mfcc_vec_per_segment = math.ceil(num_samples_per_segment / hop_length)
    signal, sr = librosa.load(file, sr=SAMPLE_RATE)
                    
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

def split_audio_stems(filePath,fileName):
    separator = Separator('spleeter:4stems')
    separator.separate_to_file(filePath, "/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files_split")

    # combining melody and bass stems together
    sound1 = AudioSegment.from_file("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files_split/"+fileName[:-4]+"/other.wav")
    sound2 = AudioSegment.from_file("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files_split/"+fileName[:-4]+"/bass.wav")
    sound3 = AudioSegment.from_file("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files_split/"+fileName[:-4]+"/vocals.wav")
    combined = sound1.overlay(sound2)
    combined = combined.overlay(sound3)



    combined.export("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files_split/"+fileName[:-4]+"/combined1.wav", format='wav')

def get_bpm(fileName):
    y, sr = librosa.load("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/static/files/"+fileName) 
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)

    return int(round(tempo))

def get_bpmT(fileName):
    y, sr = librosa.load(fileName) 
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)

    return int(round(tempo))

@app.route('/', methods=['GET',"POST"])
def index():     
    identified_genre = ""
    recommended = ""
    filePath2 =""
    fileName = ""
    bpm = 0
    bars_2 = 0
    bars_3 = 0
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data # First grab the file
        
        filePath = os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))

        fileName = file.filename
        file.save(filePath) # Then save the file
        
        # changing audio channels to mono
        sound = AudioSegment.from_wav(filePath)
        sound = sound.set_channels(1)
        sound.export(filePath, format="wav")
        
        bpm = get_bpm(fileName)
        bars_2 = 2*(4*(1/(bpm/60)))
        bars_3 = 2*(2*(4*(1/(bpm/60))))
        
        mfcc = np.array(save_mfcc(filePath))
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
        split_audio_stems(filePath,fileName)
        filePath2 = "../static/files_split/" + fileName[:-4]+"/combined1.wav"
        
        
    return render_template('index.html',form=form,prediction_text = identified_genre,  recommend_text=recommended, filePath=filePath2, fileName=fileName, bpm=bpm, bars_2=bars_2, bars_3=bars_3)


if __name__ == '__main__':
    app.run(debug=True)