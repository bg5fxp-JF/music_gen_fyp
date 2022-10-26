import logging
import sys
import requests
import simpleaudio
import wave as wv
import sys
import librosa
import math
import json

sample_rate = 11025
num_channels = 2
bytes_per_sample = 2

total = sample_rate * num_channels * bytes_per_sample


data_to_pass_back = "send to node"
input = sys.argv[1]
output = data_to_pass_back
print (input)
sys.stdout.flush()


logging.basicConfig(level=logging.INFO)

audio_url = input

logging.info(f"Downloading audio file from: {audio_url}")
content = requests.get(audio_url).content


# Just to ensure that the file does not have extra bytes
blocks = len(content) // total
content = content[:total * blocks]

wave = simpleaudio.WaveObject(audio_data=content,
                              sample_rate=sample_rate,
                              num_channels=num_channels,
                              bytes_per_sample=bytes_per_sample)
# control = wave.play()


# control.wait_done()

# SAMPLE_RATE = 22050
# DURATION = 30 # seconds
# SAMPLES_PER_TRACK = SAMPLE_RATE * DURATION

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
