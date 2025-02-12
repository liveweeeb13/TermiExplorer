# TermiExplorer

TermiExplorer est un programme simple permettant d'explorer et de télécharger des fichiers à partir d'un répertoire local via un serveur web. TermiExplorer utilise **Express.js** pour gérer le serveur et permet d'afficher les fichiers et dossiers d'un répertoire, ainsi que de télécharger des fichiers sur demande.

## Prérequis

Avant de commencer, vous devez avoir installé **Node.js** sur votre machine. Vous pouvez le télécharger et l'installer à partir du [site officiel de Node.js](https://nodejs.org/).

## Cloner le projet

1. **Clonez le dépôt** dans un répertoire de votre choix :

```bash
git clone https://github.com/liveweeeb13/TermiExplorer.git
```

2. **Accédez au répertoire** du projet :

```bash
cd TermiExplorer
```

## Installer les dépendances

1. **Installez les dépendances** nécessaires en utilisant **npm** :

```bash
npm install
```

## Lancer l'application

1. **Démarrez le serveur** en exécutant la commande suivante dans le terminal :

```bash
node main.js
```

Cela démarrera le serveur Express sur le port **1010**.

2. **Accédez à l'application** via votre navigateur web en allant à l'adresse suivante :

```
http://localhost:1010
```

Si vous êtes sur un réseau local et souhaitez accéder à l'application depuis un autre appareil, utilisez l'adresse IP locale de votre machine à la place de `localhost`. L'IP locale est affiché au lancement dans les logs.

## Fonctionnalités

- Affichage des fichiers et dossiers dans une interface web simple.
- Téléchargement des fichiers au clic.
- Navigation dans les dossiers avec un bouton de retour.
- Journalisation des actions de téléchargement, y compris l'IP de l'utilisateur et les fichiers téléchargés.

## Personnalisation

- Le port du serveur est défini à **1010** dans le fichier `main.js`. Vous pouvez changer ce port si nécessaire en modifiant la variable `PORT`:
```js
const PORT = 1010
```
- L'IP locale est automatiquement récupérée par la fonction `getLocalIP()` dans le fichier `main.js`.

## Dépannage

Si vous rencontrez un problème, voici quelques points à vérifier :

1. Assurez-vous que **Node.js** est bien installé sur votre machine.
2. Vérifiez que le serveur est bien démarré avec `node main.js` et qu'aucun autre processus n'utilise le port 1010.
3. Si vous n'arrivez pas à accéder à l'application via `localhost`, essayez avec l'IP locale de votre machine.
4. Envoyez un message a `@liveweeeb` sur discord

## Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

