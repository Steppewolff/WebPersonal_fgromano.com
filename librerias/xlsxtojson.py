#Dependencias
import pandas as pd
import json

#Lee el archivo excel con la información
def year_info():
    sum_year = {}
    dictionary = {}
    df = pd.read_excel('./input_data/sum_year.xlsx')
    dictionary = df.set_index('año')['información'].to_dict()
    sum_year = json.dumps(dictionary, indent=1)

#    print(sum_year)
#Crea un archivo JSON a partir del diccionario    
#    if json==1:
#        pass

#Devuelve el diccionario
    return sum_year
