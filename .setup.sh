#! /bin/bash

cp .sample.env .env

mkdir data
echo "{}" > data/users.json
echo '{"id":0,"lists":{}}' > data/lists.json
echo '{"id":0,"items":{}}' > data/items.json
