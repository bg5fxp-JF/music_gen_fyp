import unittest
import soundfile as sf
import os
import numpy as np
from app import save_mfcc, get_bpm

class MusicGenTestCase(unittest.TestCase):
    
    # def test_save_mfcc(self):
    #     file = "test_file.wav"
    #     # Creating a sample wave file
    #     sample_rate = 22050
    #     duration = 5
    #     samples_per_track = sample_rate * duration
    #     t = np.linspace(0, duration, int(samples_per_track), endpoint=False)
    #     x = 0.5 * np.sin(2 * np.pi * 440 * t)
    #     sf.write(file, x, sample_rate)

    #     mfcc = save_mfcc(file)
    #     self.assertIsNotNone(mfcc)
    #     self.assertGreater(len(mfcc), 0)
        
    #     os.remove(file)
        
    def test_get_bpm(self):
        file = "test_file.wav"
        # Creating a sample wave file
        sample_rate = 22050
        duration = 5
        samples_per_track = sample_rate * duration
        t = np.linspace(0, duration, int(samples_per_track), endpoint=False)
        x = 0.5 * np.sin(2 * np.pi * 440 * t)
        sf.write(file, x, sample_rate)
        
        bpm = get_bpm(file)
        self.assertGreater(bpm, 0)
        
        os.remove(file)

if __name__ == '__main__':
    unittest.main()