import unittest
import soundfile as sf
import os
import numpy as np
from app import save_mfcc, get_bpmT
import scipy.signal


class MusicGenTestCase(unittest.TestCase):

    def create_metronome(bpm, length, sample_rate, file_name):
        t = np.linspace(0, length, int(length * sample_rate), False)
        tick = scipy.signal.square(2 * np.pi * 2 * t)
        tock = scipy.signal.square(2 * np.pi * 2 * t + np.pi)
        beat_length = 60 / bpm
        metronome = np.hstack([tick, np.zeros(int(beat_length * sample_rate)), tock, np.zeros(int(beat_length * sample_rate))])
        metronome = np.tile(metronome, int(length / (beat_length * 2)))[:int(length * sample_rate)]
        sf.write(file_name, metronome, sample_rate)


    
    def test_save_mfcc(self):
        file = "test_file.wav"
        # Creating a sample wave file
        sample_rate = 22050
        duration = 30
        bpm = 80
        samples_per_beat = int(sample_rate / (bpm / 60))
        samples_per_track = sample_rate * duration
        # t = np.linspace(0, duration, int(samples_per_track), endpoint=False)
        # x = 0.5 * np.sin(2 * np.pi * 440 * t)
        x = np.sin(2 * np.pi * np.arange(samples_per_track) / samples_per_beat)
        sf.write(file, x, sample_rate)

        mfcc = save_mfcc(file)
        self.assertIsNotNone(mfcc)
        self.assertGreater(len(mfcc), 0)

        os.remove(file)
 


    # def test_get_bpm(self):
    #     file = "test_file.wav"
    #     # Creating a sample wave file
    #     sample_rate = 22050
    #     duration = 30
    #     actualBpm = 80
    #     samples_per_beat = int(sample_rate / (actualBpm / 60))
    #     samples_per_track = sample_rate * duration
    #     # t = np.linspace(0, duration, int(samples_per_track), endpoint=False)
    #     # x = 0.5 * np.sin(2 * np.pi * 440 * t)
    #     x = np.sin(2 * np.pi * np.arange(samples_per_track) / samples_per_beat)
    #     sf.write(file, x, sample_rate)
        
    #     bpm = get_bpmT(file)
    #     self.assertGreater(bpm, 0)
        
    #     os.remove(file)

    def test_get_bpm(self):
        file = "test_file.wav"
        # Creating a sample wave file
        sample_rate = 22050
        duration = 30
        actualBpm = 90
        # samples_per_beat = int(sample_rate / (actualBpm / 60))
        # samples_per_track = sample_rate * duration
        # t = np.linspace(0, duration, int(samples_per_track), endpoint=False)
        # x = 0.5 * np.sin(2 * np.pi * 440 * t)
        # x = np.sin(2 * np.pi * np.arange(samples_per_track) / samples_per_beat)
        # sf.write(file, x, sample_rate)
        
        t = np.linspace(0, duration, int(duration * sample_rate), False)
        tick = scipy.signal.square(2 * np.pi * 2 * t)
        tock = scipy.signal.square(2 * np.pi * 2 * t + np.pi)
        beat_length = 60 / actualBpm
        metronome = np.hstack([tick, np.zeros(int(beat_length * sample_rate)), tock, np.zeros(int(beat_length * sample_rate))])
        metronome = np.tile(metronome, int(duration / (beat_length * 2)))[:int(duration * sample_rate)]
        sf.write(file, metronome, sample_rate)

        bpm = get_bpmT(file)

        self.assertGreater(bpm, 0)
        # self.assertEqual(bpm,0)
        
        
        os.remove(file)

if __name__ == '__main__':

    # create_metronome(120, 10, 44100, 'metronome.wav')
    unittest.main()