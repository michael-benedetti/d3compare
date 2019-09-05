#!/usr/bin/env bash
set -euxo pipefail

yarn install --no-progress

./gradlew assemble sonarqube -x test \
    -Dsonar.gitlab.project_id=$CI_PROJECT_PATH \
    -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA \
    -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME \
    -Dsonar.gitlab.user_token=$SONAR_GITLAB_AUTH_TOKEN \
    -Dsonar.gitlab.failure_notification_mode=exit-code