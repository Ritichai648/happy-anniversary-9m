const puppeteer = require('puppeteer');

const sendSpamMessages = async (username, password, recipient, messages, count) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // เข้าสู่ระบบ Instagram
    await page.goto('https://www.instagram.com/accounts/login/', { timeout: 60000 });
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // ไปที่หน้าผู้ใช้
    await page.goto(`https://www.instagram.com/direct/t/17842581311527175/`, { timeout: 60000 });

    // รอให้ textarea ปรากฏ
    await new Promise(resolve => setTimeout(resolve, 2000)); // รอ 2 วินาทีก่อนค้นหา textarea
    await page.waitForSelector('<p class="xat24cr xdj266r">', { timeout: 60000 }); // รอ textarea

    // ส่งข้อความซ้ำ
    for (let i = 0; i < count; i++) {
        for (const message of messages) {
            await page.type('<p class="xat24cr xdj266r">', message);
            await page.keyboard.press('Enter');
            await new Promise(resolve => setTimeout(resolve, 1000)); // รอ 1 วินาทีก่อนส่งข้อความถัดไป
        }
    }

    console.log('ส่งข้อความเสร็จสิ้น');
    await browser.close();
};

// ตัวอย่างการใช้
const username = 'onedxywithyou_';
const password = 'Yuki280124#';
const recipient = 'mumi_miiiii_bj';
const messages = ['หายงงอนะค้าบบ', 'ดีกันนะค้าบบบ', 'นะค้าบๆๆๆ','นะๆๆ','น้าาาๆๆๆๆๆๆๆๆๆๆ', 'หายงอนะค้าบบ'];
const count = 100;

sendSpamMessages(username, password, recipient, messages, count);
