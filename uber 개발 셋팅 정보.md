# Uber 개발 셋팅 정보

-   potgres 서버 켜기

      <pre><code>pg_ctl -D "C:\Program Files\PostgreSQL\12\data" stop
    pg_ctl -D "C:\Program Files\PostgreSQL\12\data" start</code></pre>

-   Server-side

      <pre><code>yarn add typescript ts-node nodemon --dev</code></pre>

-   tslint 사용하여 typescript 코드 관리

      <pre><code>yarn add tslint-config-prettier --dev
    yarn add graphql-yoga</code></pre>

-   보안 미들 웨어
    (요청때마다 미들웨어가 요청을 잠시 멈추고 검사한 후에 위험하지 않다면 요청을 계속 진행함.)
-   morgan is for logs, Cors is for acceptting connections from other clients

      <pre><code>yarn add helmet
    yarn add morgan cors
    yarn add @types/cors @types/helmet @types/morgan --dev (package.json -> dependencied에 추가)
    yarn add graphql-tools merge-graphql-schemas</code></pre>

-   graphql에게 type을 체크할 수 있도록 해주는 기능

      <pre><code>
      yarn add graphql-to-typescript gql-merge --dev
          ==> pakage.json/scripts내 아래 코드 추가
          "pretypes": "gql-merge --out-file ./src/schema.graphql ./src/api/**/*.graphql",
          "types": "graphql-to-typescript ./src/schema.graphql ./src/types/graphql.d.ts"
          ==> type 명령어 실행 시 pretypes 명령이 실행되어 ./src/schema.graphql라는 결과물 파일을 만들어줌.
          ==> graphql을 typescript interface로 변경해주고 resolver에서 해당 interface들을 사용하면서 리턴값이 올바른지 체크할 수 있음</code></pre>

-   yarn types에러 발생하여 설치

      <pre><code>
    yarn add babel-runtime --dev
    yarn add pg</code></pre>

-   환경변수 접근 및 제어 가능

      <pre><code>
    yarn add dotenv</code></pre>

-   type에 대한의 유효성 검증 기능 (자세한 내용은 class-validator 검색)

      <pre><code>
    yarn add class-validator</code></pre>

-   bcryptjs로 패스워드 해쉬화

      <pre><code>
    yarn add bcryptjs
    yarn add @types/bcryptjs --dev</code></pre>

-   webtoken 생성용

      <pre><code>
    yarn add jsonwebtoken
    yarn add @types/jsonwebtoken --dev</code></pre>

-   mail인증 용

      <pre><code>
    yarn add mailgun-js && yarn add @types/mailgun-js --dev</code></pre>

-   subscription용
      <pre><code>
    yarn add graphql-redis-subscriptions
    yarn add graphql-subscriptions
    yarn add ioredis</code></pre>
