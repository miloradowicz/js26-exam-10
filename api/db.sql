create schema miloradowicz_exam10 collate utf8mb3_general_ci;

use miloradowicz_exam10;

create table articles
(
    id            int auto_increment
        primary key,
    title         varchar(255)             not null,
    content       text                     not null,
    image_url     varchar(255)             null,
    publicized_at datetime default (now()) not null
);

create table comments
(
    id         int auto_increment
        primary key,
    article_id int          not null,
    author     varchar(255) null,
    content    tinytext     not null,
    constraint comments_articles_id_fk
        foreign key (article_id) references articles (id)
            on delete cascade
);

