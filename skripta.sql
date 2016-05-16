#SIPAVANJE AKO SMO POZICIONIRANI U IDREKTORIJU SKRIPTE
#mysql -uKORISNIK -p --default_character_set=utf8 < skripta.sql


drop database if exists tjakopec_1;
create database tjakopec_1 charset utf8;
use tjakopec_1;

create table autor(
 sifra int not null primary key auto_increment,
 ime varchar(50) not null,
 prezime varchar(50) not null,
 datumrodenja datetime
) engine=innodb;


insert into autor (ime, prezime, datumrodenja)  values 
('Ivana','Brlić Mažuranić', '1874-04-18'),
('August','Šenoa', '1838-11-14'),
('Robert','Preišić', null);