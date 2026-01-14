#!/bin/bash

# =============================================================================
# Script de déploiement - Bible Journey
# =============================================================================

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="bible-journey"
DEPLOY_DIR="/var/www/$APP_NAME"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Déploiement de Bible Journey${NC}"
echo -e "${BLUE}========================================${NC}"

# Fonction pour afficher les messages
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."

    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé. Installez-le avec: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"
        exit 1
    fi

    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        log_error "npm n'est pas installé."
        exit 1
    fi

    log_info "Node.js version: $(node -v)"
    log_info "npm version: $(npm -v)"
}

# Installation des dépendances
install_dependencies() {
    log_info "Installation des dépendances..."
    cd "$REPO_DIR"
    npm ci --production=false
}

# Build de l'application
build_app() {
    log_info "Build de l'application..."
    cd "$REPO_DIR"
    npm run build

    if [ ! -d "dist" ]; then
        log_error "Le build a échoué - dossier dist non trouvé"
        exit 1
    fi

    log_info "Build terminé avec succès!"
}

# Déploiement des fichiers
deploy_files() {
    log_info "Déploiement des fichiers vers $DEPLOY_DIR..."

    # Créer le répertoire de déploiement si nécessaire
    sudo mkdir -p "$DEPLOY_DIR"

    # Backup de l'ancienne version (si existe)
    if [ -d "$DEPLOY_DIR/dist" ]; then
        BACKUP_DIR="$DEPLOY_DIR/backup_$(date +%Y%m%d_%H%M%S)"
        log_info "Sauvegarde de l'ancienne version vers $BACKUP_DIR"
        sudo mv "$DEPLOY_DIR/dist" "$BACKUP_DIR"
    fi

    # Copier les nouveaux fichiers
    sudo cp -r "$REPO_DIR/dist" "$DEPLOY_DIR/"

    # Définir les permissions
    sudo chown -R www-data:www-data "$DEPLOY_DIR"
    sudo chmod -R 755 "$DEPLOY_DIR"

    log_info "Fichiers déployés!"
}

# Configuration Nginx
setup_nginx() {
    log_info "Configuration de Nginx..."

    # Copier la configuration Nginx
    if [ -f "$REPO_DIR/nginx.conf" ]; then
        sudo cp "$REPO_DIR/nginx.conf" "/etc/nginx/sites-available/$APP_NAME"

        # Activer le site si pas déjà fait
        if [ ! -L "/etc/nginx/sites-enabled/$APP_NAME" ]; then
            sudo ln -s "/etc/nginx/sites-available/$APP_NAME" "/etc/nginx/sites-enabled/$APP_NAME"
        fi

        # Tester la configuration
        if sudo nginx -t; then
            sudo systemctl reload nginx
            log_info "Nginx rechargé avec succès!"
        else
            log_error "Erreur dans la configuration Nginx"
            exit 1
        fi
    else
        log_warn "Fichier nginx.conf non trouvé, configuration manuelle requise"
    fi
}

# Menu principal
main() {
    case "${1:-full}" in
        "deps")
            check_prerequisites
            install_dependencies
            ;;
        "build")
            build_app
            ;;
        "deploy")
            deploy_files
            setup_nginx
            ;;
        "full")
            check_prerequisites
            install_dependencies
            build_app
            deploy_files
            setup_nginx
            ;;
        *)
            echo "Usage: $0 {deps|build|deploy|full}"
            echo "  deps   - Installer les dépendances uniquement"
            echo "  build  - Build uniquement"
            echo "  deploy - Déployer les fichiers et configurer Nginx"
            echo "  full   - Tout faire (par défaut)"
            exit 1
            ;;
    esac

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Déploiement terminé avec succès!${NC}"
    echo -e "${GREEN}========================================${NC}"
}

main "$@"
