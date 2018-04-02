#!/bin/bash
set -x # Show the output of the following commands (useful for debugging)

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 /tmp/deploy # Allow read access to the private key
ssh-add /tmp/deploy # Add the private key to SSH

ssh deploy@165.227.197.233 'bash -s' < ./scripts/deploy_.sh
