# Guide de Déploiement VPS - Bible Journey

**URL finale:** https://bible-journey.woutils.com
**Chemin sur le serveur:** `/opt/apps/bible-journey`

---

## Déploiement Rapide (Copier-Coller)

### Étape 1: Cloner le projet sur le VPS

```bash
# Créer le dossier
sudo mkdir -p /opt/apps/bible-journey
sudo chown $USER:$USER /opt/apps/bible-journey

# Cloner le repo
cd /opt/apps/bible-journey
git clone https://github.com/wilf974/bible-journey.git .
```

### Étape 2: Configurer le DNS

Ajouter un enregistrement DNS chez votre registrar:

| Type | Nom | Valeur |
|------|-----|--------|
| A | bible-journey | IP_DE_VOTRE_VPS |

### Étape 3: Lancer le déploiement

```bash
cd /opt/apps/bible-journey
chmod +x deploy.sh

# Déploiement complet (sans SSL)
./deploy.sh full

# Puis obtenir le certificat SSL
./deploy.sh ssl
```

---

## Déploiement Manuel Étape par Étape

### 1. Prérequis

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier
node -v  # v20.x.x
npm -v   # 10.x.x
```

### 2. Cloner et Build

```bash
cd /opt/apps/bible-journey

# Installer les dépendances
npm ci

# Build production
npm run build

# Vérifier que dist/ existe
ls -la dist/
```

### 3. Configuration Nginx (sans casser les autres sites)

```bash
# Copier la config spécifique à bible-journey
sudo cp nginx.conf /etc/nginx/sites-available/bible-journey

# Activer le site (crée un lien symbolique)
sudo ln -s /etc/nginx/sites-available/bible-journey /etc/nginx/sites-enabled/

# Tester la config (vérifie TOUS les sites)
sudo nginx -t

# Si OK, recharger Nginx
sudo systemctl reload nginx
```

**Important:** Chaque site a sa propre config dans `sites-available`. Cette config n'affecte que le sous-domaine `bible-journey.woutils.com`.

### 4. Obtenir le certificat SSL

**Méthode 1: Certbot automatique**
```bash
sudo certbot --nginx -d bible-journey.woutils.com
```

**Méthode 2: Si vous avez un wildcard existant pour *.woutils.com**

Modifiez `/etc/nginx/sites-available/bible-journey` pour utiliser le certificat wildcard:

```nginx
ssl_certificate /etc/letsencrypt/live/woutils.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/woutils.com/privkey.pem;
```

### 5. Vérifier

```bash
# Tester la config
sudo nginx -t

# Recharger
sudo systemctl reload nginx

# Tester l'URL
curl -I https://bible-journey.woutils.com
```

---

## Mise à Jour de l'Application

```bash
cd /opt/apps/bible-journey

# Récupérer les modifications
git pull origin main

# Rebuild et redéployer (sans toucher à Nginx)
./deploy.sh update
```

---

## Structure des fichiers sur le VPS

```
/opt/apps/bible-journey/
├── dist/              # Fichiers buildés (servis par Nginx)
├── src/               # Code source
├── node_modules/      # Dépendances
├── nginx.conf         # Config Nginx de référence
├── deploy.sh          # Script de déploiement
├── .env               # Variables d'environnement
└── package.json

/etc/nginx/
├── sites-available/
│   ├── bible-journey    # Config pour bible-journey.woutils.com
│   ├── autre-site       # Vos autres sites (non modifiés)
│   └── ...
└── sites-enabled/
    ├── bible-journey -> ../sites-available/bible-journey
    ├── autre-site -> ../sites-available/autre-site
    └── ...
```

---

## Commandes Utiles

```bash
# Voir les logs d'accès
sudo tail -f /var/log/nginx/bible-journey.access.log

# Voir les erreurs
sudo tail -f /var/log/nginx/bible-journey.error.log

# Recharger Nginx après modification
sudo nginx -t && sudo systemctl reload nginx

# Voir le statut de Nginx
sudo systemctl status nginx

# Lister les sites actifs
ls -la /etc/nginx/sites-enabled/
```

---

## Dépannage

### "nginx: [emerg] could not build server_names_hash"

Nginx a besoin de plus de mémoire pour les noms de domaine:

```bash
sudo nano /etc/nginx/nginx.conf
# Ajouter dans le bloc http {}:
server_names_hash_bucket_size 64;
```

### Certificat SSL non trouvé

Si le certificat n'existe pas encore, créez une config temporaire HTTP:

```bash
# Éditer la config
sudo nano /etc/nginx/sites-available/bible-journey

# Commenter temporairement les lignes SSL et la redirection HTTPS
# Puis:
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d bible-journey.woutils.com
```

### Les autres sites ne marchent plus

1. Vérifiez que vous n'avez pas touché aux autres fichiers dans `sites-available`
2. Testez avec `sudo nginx -t` pour voir l'erreur exacte
3. Les logs sont dans `/var/log/nginx/error.log`

---

## Variables d'environnement

Le fichier `.env` contient:

```
VITE_SUPABASE_PROJECT_ID="yetgwtqxhguidhmgjrye"
VITE_SUPABASE_PUBLISHABLE_KEY="..."
VITE_SUPABASE_URL="https://yetgwtqxhguidhmgjrye.supabase.co"
```

**Note:** Ces variables sont injectées au moment du `npm run build`, pas au runtime.
