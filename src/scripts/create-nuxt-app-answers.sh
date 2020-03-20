create-nuxt-app $1 --answers \
'{
    "name":"'$1'",
    "description":"My '$2' Strapi/Nuxt project",
    "author": "'$3'",
    "pm":"'$4'",
    "ui":"bootstrap",
    "server":"none",
    "features":["axios","pwa", "dotenv"],
    "linter":[],
    "test":"none",
    "mode":"spa",
    "devTools":[]
}'
