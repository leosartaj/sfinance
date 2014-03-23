README
===============

Sfinance is a virtual share market that lets users buy and sell shares.

Required
---------------

Installed and running web server(eg. apache) 

    MySQL should be supported

    Installation
    ---------------

1. cd (path of web directory)

    2. git clone https://github.com/leosartaj/sfinance.git

    3. Name the parent directory 'sfinance'

    4. Run setup.sh, give your MySQL username and password

    5. Script sets up a database named sfinance

    MySQL Setting
    ---------------------------------------

    1. Go to sfinance/includes/sql.php

    2. Edit the Mysql username and password


    Proxy Setting
    ---------------------------------------

    1. If you use a proxy server, edit the file sfinance/includes/proxy.php with your proxy settings

    2. If you do not use a proxy server, go to sfinance/includes and remove proxy.php

    Go to localhost/sfinance/main to access
    ---------------------------------------
