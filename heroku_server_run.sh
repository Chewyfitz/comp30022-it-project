if [ "$1" = "true" ]
    then cd client && ls && npm start
	else cd back-end && ls && node server.js
fi
