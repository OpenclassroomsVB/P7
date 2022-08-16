# P7: Créer un réseau social interne
# Projet Groupomania
# Création de la base de données Groupomania
Dans phpMyAdmin, créer la base de données Groupomania (sans table). Laisser la connexion à la base de données ouverte.
# API (backend)
Dans l'invite de commande, se placer au niveau du dossier backend et lancer la commande "npm install".
Puis installer manuellement les dépendances indiquées dans le fichier "package.json" à l'aide de la commande "npm install my-dependence --save".
Ajouter un fichier ".env" avec les données indiquées dans le fichier (livrables) "Blomme_Virginie_4_FichiersEnv_072022" (backend/.env).
Enfin, toujours depuis le dossier backend, lancer la commande "node server.js". Laisser l'invite de commande ouverte.
# Application React (frontend)
Dans une autre invite de commande, se placer au niveau du dossier frontend et installer manuellement les dépendances indiquées dans le fichier "package.json" (à l'exception des packages @testing-library, react, react-dom, react-scripts et web-vitals, qui son déjà installés) à l'aide de la commande "npm install my-dependence --save".
Ajouter un fichier ".env" avec les données indiquées dans le fichier (livrables) "Blomme_Virginie_4_FichiersEnv_072022" (frontend/.env).
Puis toujours sous le dossier frontend, lancer la commande "npm start".
Une fois le lancement effectué avec succès, la page web s'ouvre automatiquement (cela peut prendre un certain temps).
Si ce n'est pas le cas, ouvrir une page web et taper dans la barre de recherche "http://localhost:8081".
Laisser la fenêtre de l'invite de commande ouverte.
# NB : Lors du développement, la base de données a été créée sur phpMyAdmin via WampServer64. Pour utiliser WampServer64, MySQL ne doit PAS être installé sur l'ordinateur (sinon WampServer sera inutilisable).
