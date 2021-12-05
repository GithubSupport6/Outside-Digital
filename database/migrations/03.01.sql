CREATE TABLE UserTag (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    userId uuid REFERENCES Users (uid),
    tagId int REFERENCES Tag (id)
);

INSERT INTO MigrationHistory (fileNumber,versionNumber,dateApplied) VALUES (03,01,NOW())