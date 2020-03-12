create-nuxt-app $1 --answers \
'{
    "name":"'$1'",
    "description":"sweet new proj",
    "author": "jasenmichael",
    "pm":"npm",
    "ui":"none",
    "server":"none",
    "features":["axios","pwa", "dotenv"],
    "linter":[],
    "test":"jest",
    "mode":"spa",
    "devTools":["jsconfig.json"]
}'
