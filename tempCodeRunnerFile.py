config_wav_enhanced = speech.RecognitionConfig(
    sample_rate_hertz = 48000,
    enable_automatic_punctuation = True,
    language_code = 'en-US',
    use_enhanced = True,
    model = 'video'
)