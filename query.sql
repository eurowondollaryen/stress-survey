/*
ICTSURVEYUSER
*/
CREATE TABLE ICTUSER(
    USER_ID VARCHAR(200) PRIMARY KEY,
    USER_PW VARCHAR(255),
    USER_NAME VARCHAR(255),
    USER_EMAIL VARCHAR(255),
    COMP_ID VARCHAR(255),
    DEPT_NAME VARCHAR(255),
    USER_DIV VARCHAR(1),/*0 : MASTER, 1 : ADMIN, 2 : USER*/
    USER_SEX VARCHAR(1), /* 0 : MALE, 1 : FEMALE */
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14)
);
INSERT INTO ICTUSER(USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_ID, DEPT_NAME, USER_DIV, USER_SEX, INST_TIME, UPDT_TIME)
VALUES('admin', 'admin##3804', '관리자', 'sehoakasayho@gmail.com', 'K001', 'IT', '0', '0', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), NULL);
INSERT INTO ICTUSER(USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_ID, DEPT_NAME, USER_DIV, USER_SEX, INST_TIME, UPDT_TIME)
VALUES('test', 'test##3804', '테스트사용자', 'sehoakasayho@naver.com', 'K001', 'IT', '1', '0', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), NULL);

CREATE TABLE ICTCOMPANY(
    COMPANY_ID VARCHAR(10) PRIMARY KEY,
    COMPANY_NAME VARCHAR(255),
    COMPANY_NAME_1 VARCHAR(255),
    DTL_NOTE VARCHAR(255),
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14)
);
INSERT INTO ICTCOMPANY(COMPANY_ID, COMPANY_NAME, COMPANY_NAME_1, DTL_NOTE, INST_TIME, UPDT_TIME)
VALUES('K001', 'KTR', '한국화학융합시험연구원', 'test data', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), NULL);
INSERT INTO ICTCOMPANY(COMPANY_ID, COMPANY_NAME, COMPANY_NAME_1, DTL_NOTE, INST_TIME, UPDT_TIME)
VALUES('K002', 'KCL', '한국건설생활환경시험연구원', 'test Sㄱㄴㅇdata', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), NULL);


/* 설문 마스터 & 디테일 */
CREATE TABLE ICTSURVEYXM(
    SRVY_ID VARCHAR(10) PRIMARY KEY,
    SRVY_TITL VARCHAR(100),
    DTL_NOTE VARCHAR(255),
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14)
);

INSERT INTO ICTSURVEYXM
VALUES('2021060001', '감정노동 평가', '한국형 감정노동 평가도구', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'));
INSERT INTO ICTSURVEYXM
VALUES('2021060002', '직무스트레스 측정', '직무스트레스 측정도구(기본형)', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'));

/* 디테일은 설문 내용 및 가중치를 보고 설계 완성시키기 */
DROP TABLE ICTSURVEYXD;
CREATE TABLE ICTSURVEYXD(
    SRVY_ID VARCHAR(10),
    QSTN_SEQ INTEGER,
    QSTN_TITL VARCHAR(255), /* 질의 제목 */
    QSTN_OPTN_1 INTEGER, /* "전혀 그렇지 않다" 선택값에 대한 가중치(1~4 순서가 다른 경우가 있어서) */
    QSTN_OPTN_2 INTEGER, /* "약간 그렇지 않다" 선택값에 대한 가중치 */
    QSTN_OPTN_3 INTEGER, /* "약간 그렇다" 선택값에 대한 가중치 */
    QSTN_OPTN_4 INTEGER, /* "매우 그렇다" 선택값에 대한 가중치 */
    DTL_NOTE VARCHAR(255), /* 비고 */
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14),
    PRIMARY KEY (SRVY_ID, QSTN_SEQ) /* POSTGRESQL에서는 PK를 이렇게 설정 */
);

/* SURROGATE KEY 생성 FUNCTION */
CREATE OR REPLACE FUNCTION SURROGATE_NEXTVAL(iMAX_VALUE VARCHAR)
RETURNS VARCHAR
LANGUAGE PLPGSQL
AS
$$
DECLARE
    HEADER VARCHAR;
    TAIL VARCHAR;
    RESULT VARCHAR;
BEGIN
    HEADER := SUBSTR(iMAX_VALUE,1,6);
    TAIL := SUBSTR(iMAX_VALUE,7,4);
    RESULT := TO_CHAR(NOW(), 'YYYYMM');

    IF TO_CHAR(NOW(), 'YYYYMM') = HEADER THEN
        RESULT := CONCAT(RESULT, LPAD(CAST(CAST(TAIL AS INTEGER) + 1 AS VARCHAR), 4, '0'));
    ELSE
        RESULT := CONCAT(RESULT, '0001');
    END IF;

    RETURN RESULT;
END;
$$;

/* 설문 대상자 테이블 */
CREATE TABLE ICTSURVEYUSER (
    USER_ID VARCHAR(200), /* 설문 대상자 ID */
    SRVY_ID VARCHAR(10), /* 설문ID */
    START_TIME VARCHAR(14), /* 설문 기간 - 시작 */
    END_TIME VARCHAR(14), /* 설문 기간 - 끝 */
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14),
    PRIMARY KEY (USER_ID, SRVY_ID) /* POSTGRESQL에서는 PK를 이렇게 설정 */
);

/* 유저의 답변을 저장하는 테이블 - 사용되는 화면 : survey.ejs */
CREATE TABLE ICTSURVEYANSWER (
    USER_ID VARCHAR(200),
    SRVY_ID VARCHAR(10),
    QSTN_SEQ INTEGER,
    QSTN_ANS VARCHAR(32), /* 답변 값. 1~4만 할 수 있긴 한데, 확장성을 위해서 VARCHAR 사용 */
    PRIMARY KEY (USER_ID, SRVY_ID, QSTN_SEQ)
);

/* 개인정보수집동의 이력테이블. */
CREATE TABLE ICTPSINFOAGREE (
    USER_ID VARCHAR(200),
    /* 여기에는 이름 회사 부서 성별 등등이 들어가야 할 듯 */
    AGREE_YN VARCHAR(1), /* 1: AGREE, 0: NOT AGREE */
    INST_TIME VARCHAR(14),
    PRIMARY KEY (USER_ID, INST_TIME)
);

/*
아래 테이블들은 아직 시스템이 크지 않기 때문에 보류.
*/
/* 코드값 관리 마스터 테이블 */
CREATE TABLE COMCODEXM (
    COMM_CODE VARCHAR(25) PRIMARY KEY, /* 공통코드명 */
    CODE_NOTE VARCHAR(255), /* 공통코드 설명 */
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14)
);

INSERT INTO COMCODEXM(CODE_NAME, CODE_NOTE, INST_TIME)
VALUES ('COMPANY_CODE', '회사코드', TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'));

/* 코드값 관리 디테일 테이블 */
CREATE TABLE COMCODEXD (
    COMM_CODE VARCHAR(25), /* 공통코드명 */
    COMM_NAME VARCHAR(25), /* 코드값(key) */
    CODE_VAL VARCHAR(255), /* 코드명칭(value) */
    INST_TIME VARCHAR(14),
    UPDT_TIME VARCHAR(14)
);