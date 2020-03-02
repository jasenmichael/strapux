echo "installing Strapi in $1/$2"
cd $1
npx create-strapi-app $2 --no-run --use-$3
echo "Strapi installed"
echo ===================================


