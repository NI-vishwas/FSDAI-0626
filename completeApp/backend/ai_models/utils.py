import joblib
import os
from sklearn.feature_extraction.text import TfidfVectorizer

PICKLE_PATH = '/home/vishwas/Workspace/temp/NUS-FSD-AI-0625/completeApp/ai_models/saved_models/'

def is_spam(test_message):
    if os.path.exists(PICKLE_PATH):
        with open(PICKLE_PATH+'logistic_regression.joblib','rb') as fh:
            model = joblib.load(fh)

        with open(PICKLE_PATH+'feature_extraction.joblib','rb') as fhandle:
            loaded_vectorizer = joblib.load(fhandle)
        
        
        input_data_features = loaded_vectorizer.transform([test_message])

        prediction = model.predict(input_data_features)
        print(f"Message: {test_message}")
        print(f"Predicted Output: {prediction}")
        if prediction[0] == 0:
            #print("Ham mail")
            #return "Ham mail"
            return False
        else:
            # print("Spam Mail")
            # return "Spam Mail"
            return True

if __name__ == '__main__':
    test_message = "Congratulations! You've won a free ticket to Bahamas. Click here to claim your prize."
    if is_spam(test_message):
        print("SPAM")
    else:
        print("NOT SPAM")