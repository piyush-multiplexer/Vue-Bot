#!/bin/bash

FILE_FOR_MD5_CHECK="package.json"
CURRENT_MD5_FILE="md5.txt"

if [ -f "$CURRENT_MD5_FILE" ]; then
	CURRENT_MD5=$(cat $CURRENT_MD5_FILE | awk '{printf("%s ", $1)}')
	NEW_MD5=$(md5sum $FILE_FOR_MD5_CHECK | awk '{printf("%s ", $1)}')
	echo  $CURRENT_MD5
	echo  $NEW_MD5
	if [ "$CURRENT_MD5" = "$NEW_MD5" ]; then
		echo "Same files"
	else
		echo "Found modified $FILE_FOR_MD5_CHECK"
		echo "$NEW_MD5" | sudo -S tee $CURRENT_MD5_FILE
		sudo -S npm install
#        sudo -S npm audit fix --force
	fi
fi

if [ ! -f "$CURRENT_MD5_FILE" ]; then
	echo "No $CURRENT_MD5_FILE exist creating new one"
	md5sum $FILE_FOR_MD5_CHECK | awk '{print $1}' | sudo -S tee $CURRENT_MD5_FILE
    sudo -S npm install
#    sudo -S npm audit fix --force
fi
