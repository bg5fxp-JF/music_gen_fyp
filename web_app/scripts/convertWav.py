import sys
import librosa
import math
import json
from IPython.display import Audio


# SAMPLE_RATE = 22050
# DURATION = 30 # seconds
# SAMPLES_PER_TRACK = SAMPLE_RATE * DURATION
from pydub import AudioSegment
from pydub.playback import play

# song = AudioSegment.from_wav("/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/scripts/sample1.wav")
# song = AudioSegment.from_wav("blob:http://127.0.0.1:5500/45e751ed-03d6-4e15-9846-7e78faec5818")

# Audio(url="blob:http://127.0.0.1:5500/5df92f8e-d0a7-47c6-8880-efdb799e6ca6")
Audio(data="/Users/bg5fxp_jf/Documents/music_gen_fyp/web_app/scripts/sample.mp3")
# play(song)




# data_to_pass_back = "send to node"
# input = sys.argv[1]
# output = data_to_pass_back
# print (output)
# sys.stdout.flush()


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
        
        
        
#         if len(mfcc) == expected_mfcc_vec_per_segment:
#             return mfcc.toList()


    