#! /bin/bash

echo 'Setting up application environment...'

echo 'Creating .env file...'
cp .sample.env .env

echo 'Setting up data directory...'
mkdir data
echo "{}" > data/users.json
echo '{"id":0,"lists":{}}' > data/lists.json
echo '{"id":0,"items":{}}' > data/items.json

echo -e '\nDone'
