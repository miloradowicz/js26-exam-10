create schema miloradowicz_exam10 collate utf8mb3_general_ci;

create table miloradowicz_exam10.articles
(
    id            int auto_increment
        primary key,
    title         varchar(255)             not null,
    content       text                     not null,
    image_url     varchar(255)             null,
    publicized_at datetime default (now()) not null
);

create table miloradowicz_exam10.comments
(
    id         int auto_increment
        primary key,
    article_id int          not null,
    author     varchar(255) null,
    content    tinytext     not null,
    constraint comments_articles_id_fk
        foreign key (article_id) references miloradowicz_exam10.articles (id)
            on delete cascade
);

INSERT INTO miloradowicz_exam10.articles (id, title, content, image_url, publicized_at) VALUES (8, 'Half-Life 3 is finally coming confirmed!', 'It\'s been twenty years since Half-Life 2 came out.', null, '2024-12-21 10:32:18');
INSERT INTO miloradowicz_exam10.articles (id, title, content, image_url, publicized_at) VALUES (9, 'Yandex is spying on its customers!', 'It\'s true!', null, '2024-12-21 10:46:50');
INSERT INTO miloradowicz_exam10.articles (id, title, content, image_url, publicized_at) VALUES (10, 'Koolaid: to drink or not to drink?', 'Should you drink Koolaid? Some say you should, some say you shouldn\'t, but where is the truth? Let\'s find out.', null, '2024-12-21 12:05:40');

INSERT INTO miloradowicz_exam10.comments (id, article_id, author, content) VALUES (3, 10, 'miloradowicz', 'dumb take');
INSERT INTO miloradowicz_exam10.comments (id, article_id, author, content) VALUES (6, 10, null, 'author kys');
INSERT INTO miloradowicz_exam10.comments (id, article_id, author, content) VALUES (7, 10, null, 'go drink koolaid');
INSERT INTO miloradowicz_exam10.comments (id, article_id, author, content) VALUES (10, 9, 'miloradowicz', 'based comment');
INSERT INTO miloradowicz_exam10.comments (id, article_id, author, content) VALUES (11, 9, 'know-it-all', 'well, duh... ofc they do, everybody does.
amazon, google,microsoft,apple all of them');
INSERT INTO miloradowicz_exam10.comments (id, article_id, author, content) VALUES (12, 8, null, 'fake news');
