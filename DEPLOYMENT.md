# Guide de Déploiement VPS - Bible Journey

## Prérequis sur le VPS

### Système d'exploitation recommandé
- Ubuntu 22.04 LTS ou Debian 12

### Logiciels requis
- Node.js 18+ (recommandé: 20 LTS)
- npm ou yarn
- Nginx
- Git

---

## Option 1: Déploiement Standard (Nginx + fichiers statiques)

### Étape 1: Préparer le VPS

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installer Nginx
sudo apt install -y nginx

# Installer Git
sudo apt install -y git

# Vérifier les installations
node -v    # Doit afficher v20.x.x
npm -v     # Doit afficher 10.x.x
nginx -v   # Doit afficher nginx/1.x.x
```

### Étape 2: Cloner le projet

```bash
# Créer le répertoire de déploiement
sudo mkdir -p /var/www/bible-journey
sudo chown $USER:$USER /var/www/bible-journey

# Cloner le dépôt
cd /var/www/bible-journey
git clone https://github.com/VOTRE_USERNAME/bible-journey.git .

# OU copier les fichiers via SCP depuis votre machine locale:
# scp -r ./bible-journey/* user@votre-vps:/var/www/bible-journey/
```

### Étape 3: Configurer l'environnement

```bash
# Créer le fichier .env pour la production
cd /var/www/bible-journey
nano .env

# Ajouter les variables (remplacer par vos valeurs):
VITE_SUPABASE_PROJECT_ID="votre_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="votre_anon_key"
VITE_SUPABASE_URL="https://votre_project_id.supabase.co"
```

### Étape 4: Build de l'application

```bash
cd /var/www/bible-journey

# Installer les dépendances
npm ci

# Build pour la production
npm run build

# Les fichiers seront dans le dossier 'dist'
ls -la dist/
```

### Étape 5: Configurer Nginx

```bash
# Éditer la configuration Nginx
sudo nano /etc/nginx/sites-available/bible-journey
```

Copier cette configuration (adapter le domaine):

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    root /var/www/bible-journey/dist;
    index index.html;

    # Gestion des routes SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compression gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

Activer le site:

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/bible-journey /etc/nginx/sites-enabled/

# Désactiver le site par défaut (optionnel)
sudo rm /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl reload nginx
```

### Étape 6: Configurer SSL avec Certbot (HTTPS)

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Le renouvellement automatique est configuré automatiquement
# Vérifier avec:
sudo certbot renew --dry-run
```

### Étape 7: Configurer le pare-feu

```bash
# Activer UFW si pas déjà fait
sudo ufw enable

# Autoriser SSH, HTTP et HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Vérifier le statut
sudo ufw status
```

---

## Option 2: Déploiement avec Docker

### Étape 1: Installer Docker

```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter votre user au groupe docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt install -y docker-compose-plugin

# Vérifier l'installation
docker --version
docker compose version
```

### Étape 2: Cloner et configurer

```bash
cd /opt
sudo mkdir bible-journey && sudo chown $USER:$USER bible-journey
cd bible-journey
git clone https://github.com/VOTRE_USERNAME/bible-journey.git .
```

### Étape 3: Build et démarrer

```bash
# Build l'image Docker
docker compose build

# Démarrer le conteneur
docker compose up -d

# Vérifier que le conteneur tourne
docker compose ps

# Voir les logs
docker compose logs -f
```

L'application sera accessible sur le port 8080.

### Étape 4: Reverse proxy Nginx (pour SSL)

```bash
# Installer Nginx sur l'hôte
sudo apt install -y nginx

# Configuration pour proxy vers Docker
sudo nano /etc/nginx/sites-available/bible-journey
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activer et configurer SSL
sudo ln -s /etc/nginx/sites-available/bible-journey /etc/nginx/sites-enabled/
sudo certbot --nginx -d votre-domaine.com
```

---

## Script de déploiement automatique

Un script `deploy.sh` est inclus pour automatiser le déploiement:

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Déploiement complet
./deploy.sh full

# Ou étapes individuelles:
./deploy.sh deps    # Installer les dépendances
./deploy.sh build   # Build uniquement
./deploy.sh deploy  # Déployer et configurer Nginx
```

---

## Mise à jour de l'application

### Option standard (Nginx)

```bash
cd /var/www/bible-journey

# Récupérer les dernières modifications
git pull origin main

# Réinstaller les dépendances si nécessaire
npm ci

# Rebuild
npm run build

# Les fichiers sont automatiquement servis par Nginx
```

### Option Docker

```bash
cd /opt/bible-journey

# Récupérer les modifications
git pull origin main

# Rebuild et redémarrer
docker compose build
docker compose up -d
```

---

## Dépannage

### L'application affiche une page blanche

1. Vérifier les logs du navigateur (F12 > Console)
2. Vérifier que le fichier `.env` contient les bonnes valeurs Supabase
3. Rebuild l'application après avoir modifié `.env`

### Erreur 404 sur les routes

Vérifier que la directive `try_files $uri $uri/ /index.html;` est présente dans Nginx.

### Problèmes de connexion Supabase

1. Vérifier que les URLs Supabase sont correctes
2. Vérifier que le projet Supabase est actif
3. Vérifier les règles RLS dans Supabase

### Voir les logs

```bash
# Logs Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Logs Docker
docker compose logs -f
```

---

## Configuration Supabase

Le projet utilise Supabase comme backend. Assurez-vous que:

1. **Authentification** est activée (Email/Password)
2. **Row Level Security (RLS)** est activée sur toutes les tables
3. Les **migrations** ont été appliquées (dossier `supabase/migrations/`)

### Appliquer les migrations

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier au projet
supabase link --project-ref votre_project_id

# Appliquer les migrations
supabase db push
```

---

## Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_PROJECT_ID` | ID du projet Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clé publique (anon key) |
| `VITE_SUPABASE_URL` | URL du projet Supabase |

**Note:** Ces variables sont injectées au moment du build (Vite), pas au runtime.

---

## Sécurité

1. Ne jamais exposer les clés secrètes (service_role key)
2. Configurer HTTPS avec Certbot
3. Activer le pare-feu (UFW)
4. Mettre à jour régulièrement le système
5. Configurer des backups automatiques

---

## Support

Pour toute question, ouvrez une issue sur le dépôt GitHub.
