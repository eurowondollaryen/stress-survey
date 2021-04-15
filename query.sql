/*
ICTSURVEYUSER
*/
CREATE TABLE ICTSURVEYUSER(
    USER_ID VARCHAR(200) PRIMARY KEY,
    USER_PW VARCHAR(255),
    USER_NAME VARCHAR(255),
    USER_EMAIL VARCHAR(255),
    COMP_NAME VARCHAR(255),
    DEPT_NAME VARCHAR(255),
    USER_DIV VARCHAR(1),/*0 : MASTER, 1 : ADMIN, 2 : USER*/
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14)
);
INSERT INTO ICTSURVEYUSER(USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV, INST_TIME, UPDT_TIME)
VALUES('admin', 'admin##3804', '관리자', 'sehoakasayho@gmail.com', 'KTR', 'IT', '0', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), NULL);
INSERT INTO ICTSURVEYUSER(USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV, INST_TIME, UPDT_TIME)
VALUES('test', 'test##3804', '테스트사용자', 'sehoakasayho@naver.com', 'KTR', 'IT', '1', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), NULL);