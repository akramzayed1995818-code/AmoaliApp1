name: Deploy to Firebase

on:
  push:
    branches:
      - main  # غيّر "main" إذا كان اسم الفرع لديك مختلف

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci  # أو npm install حسب مشروعك

      # إذا كان لديك أمر بناء (build) لمشروعك أضفه هنا، مثل:
      # - run: npm run build

      - uses: w9jds/firebase-action@v2.2.0
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
