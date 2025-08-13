#!/bin/bash

# Deploy script for GitHub Pages

echo "🚀 Deploying to GitHub Pages..."

# Check if we're on the main branch
if [[ $(git branch --show-current) != "main" ]]; then
    echo "❌ Please switch to the main branch first"
    exit 1
fi

# Add all changes
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to GitHub
git push origin main

echo "✅ Deployment initiated!"
echo "🌐 Your site will be available at: https://evra05.github.io/moneypersonalitytest/"
echo "⏳ It may take a few minutes for changes to appear."
