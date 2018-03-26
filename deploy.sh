#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 /tmp/deploy # Allow read access to the private key
ssh-add /tmp/deploy # Add the private key to SSH

ssh-keyscan -p 22 -t rsa 165.227.197.233 >> ~/.ssh/known_hosts
touch ~/teste.txt

# ssh deploy@165.227.197.233 -p 22 <<EOF
#   cd ~
#   ~/touch batata.txt # Change to whatever commands you need!
# EOF

ssh deploy@165.227.197.233
