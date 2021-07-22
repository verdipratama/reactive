#!/bin/bash
# build
yarn cross-env NODE_ENV=production wp --env prod
# install gcloud cli
echo "Installing gcloud sdk"
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-237.0.0-linux-x86_64.tar.gz
tar -xzf google-cloud-sdk-237.0.0-linux-x86_64.tar.gz
./google-cloud-sdk/bin/gcloud --version
# authenticate to gcloud
echo "Authenticating to gcloud"
echo $GCLOUD_KEY_FILE > /tmp/gcloud_keyfile.json
./google-cloud-sdk/bin/gcloud auth activate-service-account --key-file /tmp/gcloud_keyfile.json
# upload sourcemaps
echo "Uploading sourcemaps to gcs..."
./google-cloud-sdk/bin/gsutil cp build/**/**/*.map gs://<bucket-name>/
# delete sourcemaps
echo "Deleting sourcemaps from netlify deploy"
rm build/**/**/*.map
