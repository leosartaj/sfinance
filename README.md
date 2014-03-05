# README.md

!! Incomplete, Under active development

Only for local development, some links are hard-coded to localhost

Installation

All the file should be stored in sfinance

Go to localhost/sfinance/main to access.

Needs a MySQL database named sfinance

Needs The Following tables

1.info_users
	user_id(int, primary key AI)
	first(varchar{20}, index)
	last(varchar{20}, index)
	email(varcher{50}, unique)

2.users
	user_id(int,primary key, AI)
	username(varchar{20}, unique)
	password(varchar{20})

3.balance
	user_id(int, primary key)
	balance(double, set default intitial amount)

4.shares
	query_num(bigint, primary key, AI)
	user_id(int, index)
	symbol(varchar{20}, index)
	quantity(int)
