#!/bin/bash

# sets up the database 
echo -n "Enter MySQL username : "
read usr
echo -n "Enter MySQL password : "
read -s pw

db="CREATE DATABASE sfinance;USE sfinance;CREATE TABLE info_users(user_id int AUTO_INCREMENT, first varchar(20) NOT NULL, last varchar(20) NOT NULL, email varchar(50) UNIQUE NOT NULL, PRIMARY KEY(user_id));CREATE TABLE users (user_id int AUTO_INCREMENT, username varchar(20) UNIQUE NOT NULL, password varchar(100) NOT NULL, PRIMARY KEY(user_id));CREATE TABLE balance (user_id int NOT NULL, balance double DEFAULT '5000' NOT NULL, PRIMARY KEY(user_id)); CREATE TABLE shares (query_num bigint AUTO_INCREMENT NOT NULL, user_id int NOT NULL, symbol varchar(20) NOT NULL, quantity int NOT NULL, spent double NOT NULL, PRIMARY KEY(query_num)); CREATE INDEX shares_user_id ON shares (user_id); CREATE INDEX shares_symbol ON shares (symbol);"

mysql -u$usr -p$pw -e "$db"

if [ $? != "0" ]; then
    echo -e "\n[Error]: Database creation failed"
    exit 1
else
    echo -e "\n------------------------------------------"
    echo " Database has been created successfully "
    echo "------------------------------------------"
    echo ""
    echo " DB Name: sfinance"
    echo ""
    echo "------------------------------------------"
fi
