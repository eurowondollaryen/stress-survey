# stress-survey

직무스트레스 설문 웹앱

# tech stack

- ejs
- Node.js Express
- Postgres

# Functions

1. admin
2. common user

## Functions - admin

1. 회원관리 : 설문대상자를 관리한다.(대상자 추가-관리자, 일반사용자 모두 가능, 일괄 추가, 회원정보수정)
2. 문항관리 : 설문대상자가 답변할 문항 내용을 관리한다.
3. 통계관리 : 소속단체별, 인원별 답변 현황을 관리한다.

## Functions - common user

1. 설문 : 설문에 대해 답안 체크 후 제출한다.

## TODO

- 사용자 조회/생성/삭제 - done
- 회사 조회/생성/삭제 - done
- 설문 문항 TABLE 설계(ICTSURVEYXM, ICTSURVEYXD)
- 사용자 조회 조건에 회사 추가, 이름 검색 추가, ID검색 추가
- 설문 일정 테이블 추가(ICTSURVEYSCHD)
- 설문 대상자 테이블 추가(ICTSURVEYUSER)

## RULE

- COLUMN 명은 불가피한 경우를 제외하고 4_2 OR 4_4로 네이밍
- 업무에 사용되는 테이블명은 ICT 접두어
- MASTER-DETAIL 관계일 경우, 접미어 XM, XD 사용
