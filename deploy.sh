#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 /tmp/deploy # Allow read access to the private key
ssh-add /tmp/deploy # Add the private key to SSH

# Skip this command if you don't need to execute any additional commands after deploying.
ssh apps@$IP -p $PORT <<EOF
  cd ~
  touch batata.txt # Change to whatever commands you need!
EOF
