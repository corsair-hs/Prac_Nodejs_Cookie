const express = require('express');
const app = express();

app.get('/set-cookie', (req, res) =>{
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);      // 만료 시간을 60분으로 설정

    res.cookie('name', 'sparta', {
        expires: expires
    });
    return res.status(200).end();
});

app.get('/get-cookie', (req, res) => {
    const cookie = req.headers.cookie;
    console.log(cookie);    // name = sparta
    return res.status(200).json({cookie});
});


const PORT = '5002';
app.listen(PORT, () => {
    console.log(`${PORT}번 포트로 서버가 실행되었습니다.`);
})