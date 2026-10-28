#!/usr/bin/env zsh
set -e

repo_root=$(cd "$(dirname "$0")" && pwd)
cd "$repo_root"

npm run build

cd "$repo_root/dist"
git init -b gh-pages
git add --all
git -c user.name="GitHub Pages deploy" \
  -c user.email="github-pages-deploy@users.noreply.github.com" \
  commit -m "Deploy site"
git push --force git@github.com:Liyuk/Interview-Book.git HEAD:gh-pages
