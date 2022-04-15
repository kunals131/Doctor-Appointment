#!/usr/bin/env python
# coding: utf-8

# In[42]:


import numpy as np
import pandas as pd
from scipy.stats import mode

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

# In[43]:

def diseasePredictionModel():
    data = pd.read_csv("Training.csv")

    # In[53]:


    data.head(2)
    data.columns

    # In[45]:


    data = data.drop(columns=['Unnamed: 133'], axis=1)

    # In[46]:


    data.head()

    # In[47]:


    product1 = data['prognosis']
    product1

    # In[48]:


    encoder = LabelEncoder()
    data["prognosis"] = encoder.fit_transform(data["prognosis"])
    data.head()
    product2 = data['prognosis']
    product2

    # In[52]:


    decodedData = dict(zip(product2, product1))
    decodedData

    # In[15]:


    X = data.iloc[:, :-1]
    y = data.iloc[:, -1]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=24)


    # In[19]:


    # Defining scoring metric for k-fold cross validation
    def cv_scoring(estimator, X, y):
        return accuracy_score(y, estimator.predict(X))


    # Initializing Models
    models = {
        "SVC": SVC(),
        "Gaussian NB": GaussianNB(),
        "Random Forest": RandomForestClassifier(random_state=18)
    }

    # Producing cross validation score for the models
    for model_name in models:
        model = models[model_name]
        scores = cross_val_score(model, X, y, cv=10,
                                 n_jobs=-1,
                                 scoring=cv_scoring)
        print("==" * 30)
        print(model_name)
        print(f"Scores: {scores}")
        print(f"Mean Score: {np.mean(scores)}")

    # In[20]:


    # Training and testing SVM Classifier
    svm_model = SVC()
    svm_model.fit(X_train, y_train)
    preds = svm_model.predict(X_test)

    print(f"Accuracy on train data by SVM Classifier: {accuracy_score(y_train, svm_model.predict(X_train)) * 100}")

    print(f"Accuracy on test data by SVM Classifier: {accuracy_score(y_test, preds) * 100}")
    cf_matrix = confusion_matrix(y_test, preds)

    # Training and testing Naive Bayes Classifier
    nb_model = GaussianNB()
    nb_model.fit(X_train, y_train)
    preds = nb_model.predict(X_test)
    print(f"Accuracy on train data by Naive Bayes Classifier: {accuracy_score(y_train, nb_model.predict(X_train)) * 100}")

    print(f"Accuracy on test data by Naive Bayes Classifier: {accuracy_score(y_test, preds) * 100}")
    cf_matrix = confusion_matrix(y_test, preds)

    # Training and testing Random Forest Classifier
    rf_model = RandomForestClassifier(random_state=18)
    rf_model.fit(X_train, y_train)
    preds = rf_model.predict(X_test)
    print(f"Accuracy on train data by Random Forest Classifier: {accuracy_score(y_train, rf_model.predict(X_train)) * 100}")

    print(f"Accuracy on test data by Random Forest Classifier: {accuracy_score(y_test, preds) * 100}")

    cf_matrix = confusion_matrix(y_test, preds)

    # In[56]:


    symptoms = X.columns.values

    # Creating a symptom index dictionary to encode the
    # input symptoms into numerical form
    symptom_index = {}
    for index, value in enumerate(symptoms):
        symptom = " ".join([i.capitalize() for i in value.split("_")])
        symptom_index[symptom] = index

    data_dict = {
        "symptom_index": symptom_index,
        "predictions_classes": encoder.classes_
    }


    # Defining the Function
    # Input: string containing symptoms separated by commmas
    # Output: Generated predictions by models
    def predictDisease(symptoms):
        symptoms = symptoms.split(",")

        # creating input data for the models
        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptoms:
            index = data_dict["symptom_index"][symptom]
            input_data[index] = 1

        # reshaping the input data and converting it
        # into suitable format for model predictions
        input_data = np.array(input_data).reshape(1, -1)

        # generating individual outputs
        rf_prediction = data_dict["predictions_classes"][rf_model.predict(input_data)[0]]
        nb_prediction = data_dict["predictions_classes"][nb_model.predict(input_data)[0]]
        svm_prediction = data_dict["predictions_classes"][svm_model.predict(input_data)[0]]

        # making final prediction by taking mode of all predictions
        final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
        predictions = {
            "rf_model_prediction": rf_prediction,
            "naive_bayes_prediction": nb_prediction,
            "svm_model_prediction": nb_prediction,
            "final_prediction": final_prediction
        }
        return predictions
    return predictDisease
# In[59]:


# import joblib
# joblib.dump(encoder,'labelEncoder.joblib',compress=9)
# # load it when test
# le=joblib.load('labelEncoder.joblib')
# import pickle
# pickle.dump(regressor,open('model.pkl', 'wb'))


# In[ ]:




