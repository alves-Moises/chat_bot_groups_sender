import os

print("Iniciando...")
os.system("cd /coding/Js/projetos_pessoais/messagens_em_grupo/chat_bot_groups/")

action = f'["propagandati"]' if input("Digite 1 para propaganda Ti  ") == "1" else f'["propagandabot"]'
os.system(f"echo {action} > src/json/open_action.json")

print(f"Opção selecionada: {action}")

os.system("node index.js")
input("erro?")
