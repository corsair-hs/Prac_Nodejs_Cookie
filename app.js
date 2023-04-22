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


const PORT = '5002';
app.listen(PORT, () => {
    console.log(`${PORT}번 포트로 서버가 실행되었습니다.`);
})