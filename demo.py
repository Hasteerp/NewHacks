import os
from google.api_core import operation
from google.cloud import speech
from google.cloud import storage
from requests.exceptions import Timeout

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'client_service2.json'
speech_client = speech.SpeechClient()
storage_client = storage.Client() 

directory= input("File path: ")
filesize = int(input("File size: (in MBps) "))
filetime = float(input("File duration: (in min) "))
if(filetime<=1):
    for i in range(0,len(directory)):
        if directory[i] == ".":
            if directory[i+1] == "w":
                media_file_name_wav = directory
                with open(media_file_name_wav,'rb') as file2:
                    byte_data_wav = file2.read()
                    audio_wav = speech.RecognitionAudio(content=byte_data_wav) 
                
                config_wav = speech.RecognitionConfig(
                sample_rate_hertz=44100,
                enable_automatic_punctuation=True,
                language_code= "en-US",
                audio_channel_count = 2,
                use_enhanced = True
                )

                respone_standard_wav = speech_client.recognize(
                config=config_wav,
                audio=audio_wav
                )

                for result in respone_standard_wav.results:
                    print('{}'.format(result.alternatives[0].transcript))
                 
                break 
            else:
                    media_file_name_mp3 = directory
                    with open(media_file_name_mp3,'rb') as file1:
                        byte_data_mp3 = file1.read()
                        audio_mp3 = speech.RecognitionAudio(content=byte_data_mp3)

                    config_mp3 = speech.RecognitionConfig(
                    sample_rate_hertz=48000,
                    enable_automatic_punctuation=True,
                    language_code= 'en-US',
                    use_enhanced = True
                    )

    
                    respone_standard_mp3 = speech_client.recognize(
                    config=config_mp3,
                    audio=audio_mp3
                    )

                    for result in respone_standard_mp3.results:
                        print('{}'.format(result.alternatives[0].transcript))

            break
else:
    bucket_name = 'long_audio_demo_data_bucket'

    def delete_blob(bucket_name, blob_name):
        """Deletes a blob from the bucket."""
        storage_client = storage.Client()
        bucket = storage_client.get_bucket(bucket_name)
        blob = bucket.blob(blob_name)

        blob.delete()

    def upload_to_bucket(blob_name, file_path, bucket_name):
        try:
            bucket = storage_client.get_bucket(bucket_name)
            blob = bucket.blob(blob_name)
            blob.upload_from_filename(file_path)
            return True

        except Exception as e:
            print(e)
            return False

    foldername = 'Audio File Demo'    

    split_index = directory.rfind("\\") 
    file_path = directory[:split_index]
    file_name = directory[split_index+1:]

    upload_to_bucket(foldername, os.path.join(file_path, file_name), 'long_audio_demo_data_bucket')
    #media_uri = 'gs://long_audio_demo_data_bucket/Audio File Demo'
    media_uri = 'gs://' +bucket_name+ '/' +foldername

    long_audi_wav = speech.RecognitionAudio(uri=media_uri)

    config_wav_enhanced = speech.RecognitionConfig(
        sample_rate_hertz = 48000,
        enable_automatic_punctuation = True,
        language_code = 'en-US',
        use_enhanced = True,
        model = 'video'
    )

    operation = speech_client.long_running_recognize(
        config=config_wav_enhanced,
        audio=long_audi_wav
    )

    response = operation.result(timeout=10000)
    for result in response.results:
        print('{}'.format(result.alternatives[0].transcript))

    delete_blob(bucket_name, foldername)