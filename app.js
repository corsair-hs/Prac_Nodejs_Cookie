const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// cookie-parser 사용하기 위한 등록
app.use(cookieParser());

app.get('/set-cookie', (req, res) =>{
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);      // 만료 시간을 60분으로 설정

    res.cookie('name', 'sparta', {
        expires: expires
    });
    return res.status(200).end();
});

app.get('/get-cookie', (req, res) => {
    // const cookie = req.headers.cookie;
    const cookies = req.cookies;    // cookie-parser 미들웨어 덕분에 사용가능
    console.log(cookies);    // name = sparta
    return res.status(200).json({cookies});
});

// 사용자의 정보를 저장할 만한 좌물쇠 (데이터를 저장하는 부분)
let session = {};   // Key - Value()

app.get('/set-session', (req, res) => {
    const name = 'sparta';
    const uniqueInt = Date.now();  // 현재 시간을 바탕으로 고유한 숫자값을 할당해줄 거다.
    session[uniqueInt] = name;  // uniqueInt를 세션의 키로 사용하고, name=sparta 세션으로 호출이 왔을때 사용할 수 있게 해줘야 함
    // Client에게 열쇠를 Cookie로 할당해줘야함
    res.cookie("sessionKey", uniqueInt);    // 세션에 데이터(name) 저장
    res.status(200).end();
});


// 저장된 열쇠를 가지고 서버의 데이터를 조회할 것임
app.get('/get-session', (req, res) => {
    // 1. 사용자 쿠키안에 들어있는 sessionKey 가져오기
    const {sessionKey} = req.cookies;
    const sessionItem = session[sessionKey];

    console.log(sessionItem);   // sparta
    return res.status(200).json({ sessionItem });
});


const PORT = '5002';
app.listen(PORT, () => {
    console.log(`${PORT}번 포트로 서버가 실행되었습니다.`);
})