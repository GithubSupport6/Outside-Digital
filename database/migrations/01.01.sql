CREATE TABLE Users (
    uid uuid PRIMARY KEY,
    email varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    nickname varchar(30)
);

INSERT INTO MigrationHistory (fileNumber,versionNumber,dateApplied) VALUES (01,01,NOW())