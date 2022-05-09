#!/bin/bash
# Build hugo
rm -r public
if hugo ; then
  # Add affiliate links
  npm run affiliate
else
  echo "Hugo build failed, did not run affiliate"
  exit 1
fi