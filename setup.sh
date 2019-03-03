#!/usr/bin/env bash

type mysql >/dev/null 2>&1 || sudo apt install mysql-server

echo export HOME_DASHBOARD_DB_USER=home_dashboard_user >> ~/.env
echo export HOME_DASHBOARD_DB_PASS=home_dashboard_pass >> ~/.env
echo export HOME_DASHBOARD_MYSQL_DATABASE=home_dashboard >> ~/.env

echo source ~/.env >> ~/.bashrc
echo source ~/.env >> ~/.bash_profile

source ~/.bash_profile
source ~/.bashrc

mysql -u root -e "CREATE USER 'home_dashboard_user'@'localhost' IDENTIFIED by 'home_dashboard_pass';"
mysql -u root -e "CREATE database home_dashboard;GRANT ALL privileges ON home_dashboard.* to 'home_dashboard_user'@'localhost';"

