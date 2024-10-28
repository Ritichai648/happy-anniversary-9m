const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'rakfanmakmak',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', (req, res, next) => {
    res.render('index', { loggedIn: req.session.loggedIn });
});

app.get('/incorrect', (req, res, next) => {
    res.render('incorrect', { loggedIn: req.session.loggedIn });
});

app.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.render('testing');
    } else {
        res.redirect('/incorrect');
    };
})

app.post('/verify', (req, res) => {
    const { code } = req.body;
    if (!code) {
        res.redirect('/incorrect');
    } else if (code === process.env.PASS) {
        req.session.loggedIn = true;
        res.redirect('/login');
    } else {
        res.redirect('/incorrect');
    }
});

app.post('/submit', (req, res) => {
    const answers = req.body;
    console.log('คำตอบที่ได้รับ:', answers);

    const correctAnswers = {
        q1: 'ม่วง',
        q2: 'แมว',
        q3: 'พิซซ่า',
        q4: '14/02/2009',
        q5: 'คอม',
        q6: 'ประวัติ',
        q7: 'เล่นแบต'
    };

    let score = 0;
    for (const [key, value] of Object.entries(answers)) {
        if (correctAnswers[key] === value) {
            score++;
        }
    }
    console.log('คะแนนที่ได้:', score);

    // ส่งผลลัพธ์ตามคะแนน
    if (score === 7) {
        req.session.loggedInPass = true;
        return res.redirect("/9_mouths"); // ถ้าตอบถูกทั้งหมด
    } else {
        return res.redirect('/incorrect')
    }

    // ถ้าตอบไม่ถูกทั้งหมด ให้ส่ง JSON เสมอ
});

app.get('/9_mouths', (req, res) => {
    if (req.session.loggedInPass) {
        res.render('9_mouth'); // แสดงหน้า 8_mouth
    } else {
        res.redirect('/incorrect'); // เปลี่ยนเส้นทางหากไม่ผ่าน
    }
});


app.post('/goodbye', (req, res) => {
    res.redirect('https://google.com')
})

app.listen(PORT, () => {
    console.log(`WebSite is running on http://localhost:${PORT}`)
})