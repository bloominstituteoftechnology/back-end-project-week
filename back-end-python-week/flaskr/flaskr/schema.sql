drop table if exists notes;
create table notes(
	id integer primary key autoincrement,
	title text not null,
	'text' text not null
);
