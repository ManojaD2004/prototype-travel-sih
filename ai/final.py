import tensorflow as tf
from PIL import Image
import numpy as np
import google.generativeai as genai
import os 
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = tf.keras.models.load_model('bgs_model.h5')


def load_and_prep_image(image, img_shape=300):
    img = tf.convert_to_tensor(image)
    img = tf.image.decode_image(tf.io.encode_jpeg(img), channels=3)
    img = tf.image.resize(img, size=[img_shape, img_shape])
    img = img / 255.0
    return img

def generate_gemini_content(pred_class, prompt):
    try:
        model = genai.GenerativeModel("gemini-pro")
        query = f"{prompt}: {pred_class}"
        response = model.generate_content(query)
        return response.text
    except Exception as e:
        return f"Error generating content: {str(e)}"


def pred_and_plot(model, image, class_names):
    img = load_and_prep_image(image)
    pred = model.predict(tf.expand_dims(img, axis=0))
    if len(pred[0]) > 1: 
        pred_class = class_names[pred.argmax()]
    else:
        pred_class = class_names[int(tf.round(pred)[0][0])]
    
    return pred_class


class_names = ['Ajanta Caves', 'Bgscet', 'Charar-E- Sharif', 'Chhota_Imambara',
               'Ellora Caves', 'Fatehpur Sikri', 'Gateway of India',
               'Humayun_s Tomb', 'India gate pics', 'Khajuraho',
               'Sun Temple Konark', 'alai_darwaza', 'alai_minar',
               'basilica_of_bom_jesus', 'charminar', 'golden temple',
               'hawa mahal pics', 'iron_pillar', 'jamali_kamali_tomb',
               'lotus_temple', 'mysore_palace', 'qutub_minar', 'tajmahal',
               'tanjavur temple', 'victoria memorial']

# Example image loading (replace 'example.jpg' with your actual image path)
image_path = "example.jpg" # The image we want to predict should come here 
image = Image.open(image_path)


pred_class = pred_and_plot(model, image, class_names)
print(f"Prediction: {pred_class}")
prompt = "Provide a comprehensive overview of this landmark, including its historical significance, cultural importance, and key features"

gemini_content = generate_gemini_content(pred_class, prompt)
print(f"Generated Information: {gemini_content}")