import json

respposta = f'["{input("Ditite algo: ")}"]'

with open('teste.json', 'w') as file:
    file.write(respposta)