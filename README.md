Lancement du Backend et Frontend
# Prérequis
1. nodejs
2. express (backend)
3. vuejs (frontend)
4. mysql (backend/database)

# Frontend
- A partir du dossier frontend, exécuter la
ligne de commande npm install
- Pour démarrer le front, exécuter la
ligne de commande npm run dev

# Backend
1. Installation
- A partir du dossier backend, exécuter la
ligne de commande npm install
- Pour démarrer le back, exécuter la
ligne de commande nodemon server ou node server

2. Variables d'environnement
- fichier .env .envexample
supprimer le .example et remplir les données par vos clé unique ( ne les perdait pas et ne plus les modifier,
sous perine de ne plus pouvoir récupérer les données)


3. Importer la base de donnée
- importer database.sql
path: ./database.sql

- Alors, créons d'abord une base de données MySQL. Connectez-vous à votre serveur MySQL à l'aide de la commande ci-dessous.
$ mysql -u USERNAME -p;

- Après vous être connecté, exécutez la commande suivante pour créer une base de données sur votre serveur MySQL.
mysql> CREATE DATABASE groupomania;


- Maintenant, importons le fichier SQL dans notre toute nouvelle base de données. Exécutez la commande suivante 
pour importer la base de données MySQL à partir d'un fichier SQL.

$ mysql -uUSERNAME -p DB_NAME < import_file.sql


4. Les différentes routes du backend


