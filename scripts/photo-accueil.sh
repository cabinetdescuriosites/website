#!/bin/bash
# Remplace la photo du premier bloc de la page d'accueil.
# Usage :  ./scripts/photo-accueil.sh ~/Desktop/ma-photo.png
set -e
SRC="$1"
DEST="public/assets/home-intro-photo.webp"
if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
  echo "Usage : ./scripts/photo-accueil.sh <chemin-de-l-image>"
  echo "Exemple : ./scripts/photo-accueil.sh ~/Desktop/buffet.png"
  exit 1
fi
cwebp -quiet -q 84 -resize 1600 0 "$SRC" -o "$DEST"
W=$(python3 -c "from PIL import Image;print(Image.open('$DEST').size[0])" 2>/dev/null || echo "?")
H=$(python3 -c "from PIL import Image;print(Image.open('$DEST').size[1])" 2>/dev/null || echo "?")
echo "Photo installée : $DEST  (${W}x${H}, $(( $(stat -f%z "$DEST") / 1024 )) Ko)"
echo "Le bloc affiche un format 4:5 — si l'image est plus haute, elle sera recadrée en haut et en bas."
