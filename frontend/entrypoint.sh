#!/bin/bash
yarn
yarn build
yarn global add serve
serve -s build
