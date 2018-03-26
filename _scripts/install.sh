#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_78e53f196bdc_key -iv $encrypted_78e53f196bdc_iv -in deploy.enc -out deploy -d
rm deploy.enc # Don't need it anymore
chmod 600 deploy
mv deploy ~/.ssh/id_rsa

touch ~/teste.txt
