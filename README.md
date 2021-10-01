# stress-survey

직무스트레스 설문 웹앱

# tech stack
- ejs
- Node.js Express
- PostgreSQL

# Functions

1. admin
2. common user

## Functions - admin
1. 회원관리 : 설문대상자를 관리한다.(대상자 추가-관리자, 일반사용자 모두 가능, 일괄 추가, 회원정보수정)
2. 문항관리 : 설문대상자가 답변할 문항 내용을 관리한다.
3. 통계관리 : 소속단체별, 인원별 답변 현황을 관리한다. 성별에 따른 결과 해석 포함

## Functions - common user
1. 설문 : 설문에 대해 답안 체크 후 제출한다.

## RULE
- COLUMN 명은 약어를 지양한다. 길이가 너무 길지 않은 이상, 단어 기술
- 업무에 사용되는 테이블명은 ICT 접두어
- MASTER-DETAIL 관계일 경우, 접미어 XM, XD 사용
- HTML id의 경우 dash를 이용하여 네이밍 ex) inp-text-company-name
