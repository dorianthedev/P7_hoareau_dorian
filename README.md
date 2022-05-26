Lancement du Backend et Frontend
# Prérequis
1. nodejs
2. express (backend)
3. vuejs (frontend)
4. mysql (backend/database)

# Frontend --port 5050
- A partir du dossier frontend, exécuter la
ligne de commande npm install
- Pour démarrer le front, exécuter la
ligne de commande npm run dev
 

# Backend --port 3000
1. Installation
- A partir du dossier backend, exécuter la
ligne de commande npm install
- Pour démarrer le back, exécuter la
ligne de commande node server
 


2. Importer la base de donnée
Importer database.sql

- Alors, créons d'abord une base de données MySQL. Connectez-vous à votre serveur MySQL à l'aide de la commande ci-dessous.
$ mysql -u USERNAME -p;

- Après vous être connecté, exécutez la commande suivante pour créer une base de données sur votre serveur MySQL.
mysql> CREATE DATABASE groupomania;


- Maintenant, importons le fichier SQL dans notre toute nouvelle base de données. Exécutez la commande suivante 
pour importer la base de données MySQL à partir d'un fichier SQL.

$ mysql -uUSERNAME -p DB_NAME < import_file.sql

 OU POUR FAIRE PLUS SIMPLE
 - copié collé toutes les requêtes et faites éxécuter.



