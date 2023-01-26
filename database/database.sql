CREATE TABLE user(
  id serial primary key,
  email varchar(128) not null unique,
  password varchar(128) not null
);

CREATE TABLE post(
  id serial primary key,
  title varchar(256) not null,
  content text not null,
  author int not null references user(id)
);