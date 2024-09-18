# 💸 Coin is Easy

https://github.com/user-attachments/assets/08edc6d0-ac1b-4e7b-b2a9-5eb8ccee684f

초보자를 위한 가상화폐 모의 투자 Cozy입니다!

부자가 되고 싶나요? 성투하고 싶은데 피 같은 내 돈 잃을까봐 무서우신가요?

실전 투자 하기 전 미리 매수, 매도 연습하고 실시간으로 변하는 코인 시세와 차트를 보며 실제 코인 시장에 대한 감각을 키우세요!

Cozy가 여러분의 성투를 도와드리겠습니다.

## 🚀 ShortCut

- 🌎 Deploy
- 💡 Motivation
- ✅ Features
- 🖥 Tech Stack
- 🕹 Getting Started

## 🌎 Deploy

## 💡 Motivation

과거엔 성실히 일하고 돈을 모으면 누구나 중산층, 내 집 마련을 할 수 있는 시대가 있었습니다. 하지만 내 월급 빼고 다 오르는 요즘. 근로 소득으로는 이제 돈을 모으기 힘든 시대가 도래했습니다.

많은 2030 들이 적금보다 수익률이 좋다며 코인 시장에 뛰어들며 주식 열풍이 불었습니다. 하지만 손해를 본 젊은이들이 많은게 현실이죠..

왜 일까요? 지식, 공부의 부족도 있겠지만 코인 시장의 흐름을 읽지 못 하고 잃어 가며 배우기 때문이라고 생각했습니다.

피 같은 돈을 그렇게 쉽게 잃었는데도 존버하면 된다며 애써 위로하는 분들을 외면할 수 없었습니다.

그래서 코인을 처음 시작하려는 초보자 분들을 위해 연습할 수 있는 모의 거래소 Cozy를 만들게 되었습니다.

## ✅ Features
|                                          |                                          |
| ---------------------------------------- | ---------------------------------------- | 
|<p align="center"><video width="3000" src="https://github.com/user-attachments/assets/5b15f6dc-47fa-4be1-a8a0-f980b67c2b45"/></p><p align="center">👉 사용자는 **실시간으로 가상화폐의 시세를 차트로 보며**매수와 매도를 할 수 있습니다.</p>|<p align="center"><video width="3000" src="https://github.com/user-attachments/assets/02b2d8e6-326f-45f1-b6fe-a369825ea58a" /></p><div align="center">👉 사용자는 자산 내역에서**코인 별 실시간 수익률, 평가 손익 등**을 볼 수 있습니다.</div>

## 🖥 Tech Stack

### Frontend

- React
- Redux
- Redux-saga
- Redux-toolkit
- Redux-Persist
- Kakao Login
- Styled-Component
- Chart.js
- lightweight-charts

### Backend

- Express
- Websocket
- JWT
- Mongo db
- Mongoose
- Nginx
- Stripe(test ver.)
- Bithumb Api
- CI/CD

### Server
- AWS EC2

## 🕹 Getting Started

### Installation

- Local 환경에서 실행하기 위해서 몇 가지 사전 준비가 필요합니다.
- 각 Repository를 Clone 한 후, .env 파일에 환경 변수를 입력해주세요.

- Frontend

```
git clone https://github.com/woongminKi/project-cozy-client.git
npm install
npm run start
```

```
REACT_APP_API_ID=736c88fab71bf57de5334a344133d9f9
REACT_APP_REDIRECT_URI=http://localhost:3000
REACT_APP_CLIENT_SECRET_ID=GZK4yVThTupvNxJ45fVYCJwhqj0z4Mc1
REACT_APP_WEBSOCKET_SERVER_URL=ws://localhost:8000/ws
REACT_APP_CANDLESTICK_API_URL=https://api.bithumb.com/public/candlestick
REACT_APP_SERVER_URL= http://localhost:8000
REACT_APP_STRIPE_PUBLISHABLE_KEY=Stripe test publisable key
REACT_APP_STRIPE_SECRET_KEY=Stripe test secret key
```

- Backend

```
git clone https://github.com/woongminKi/project-cozy-back.git
npm install
npm run dev
```

```
PORT=8000
BITHUMB_SOCKET_URL=wss://pubwss.bithumb.com/pub/ws
COZY_CLIENT_URL=http://localhost:3000
MONGO_URL=Your mongo url
SECRET_KEY=Your secret key
# Stripe API keys
STRIPE_PUBLISHABLE_KEY=Stripe test publisable key
STRIPE_SECRET_KEY=Stripe test secret key
STRIPE_WEBHOOK_SECRET=Stripe test Webhook key
```
