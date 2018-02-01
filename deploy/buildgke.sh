#!/bin/sh

set -ex

CI_COMMIT_TAG=0.0.1
GCR_REGISTRY_PREFIX=eu.gcr.io
GCLOUD_PROJECT_NAME=overlock-192311
GCLOUD_CLUSTER_NAME=mqtt-broker
GCLOUD_COMPUTE_ZONE=europe-west1-b

rocker build -f deploy/dockerfiles/base.rockerfile .
# docker-compose build

REMOTE_IMAGE_NAME="${GCR_REGISTRY_PREFIX}/${GCLOUD_PROJECT_NAME}/overlockzconnectapp_overlockfront:${CI_COMMIT_TAG}"

docker build -f deploy/Dockerfile -t ${REMOTE_IMAGE_NAME} .

gcloud docker -- push ${REMOTE_IMAGE_NAME}
