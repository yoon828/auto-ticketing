const puppeteer = require('puppeteer');
const log = require('./js/log.js');

//ticket lint tickecting
async function startTicketing(numberPerson, userId, pw) {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        " --disable-site-isolation-trials",
      ],
    });
  
    let page = await browser.newPage();
    await page.goto("https://ticket.interpark.com/Gate/TPLogin.asp");
  
    await page.setViewport({ width: 1080, height: 1024 });
  
    await page.waitForSelector("iframe");
    const id = await page.$(
      'iframe[src="https://accounts.interpark.com/authorize/ticket-pc?origin=https%3A%2F%2Fticket%2Einterpark%2Ecom%2FGate%2FTPLoginConfirmGate%2Easp%3FGroupCode%3D%26Tiki%3D%26Point%3D%26PlayDate%3D%26PlaySeq%3D%26HeartYN%3D%26TikiAutoPop%3D%26BookingBizCode%3D%26MemBizCD%3DWEBBR%26CPage%3D%26GPage%3Dhttp%253A%252F%252Fticket%252Einterpark%252Ecom%252F&postProc=IFRAME"]'
    );
  
    // 로그인
    const idSelector = "#userId";
    const idInput = "k915k1004";
    const pwSelector = "#userPwd";
    const pwInput = "godqhrgo09!";
  
    let frame = await id.contentFrame();
    await frame.type(idSelector, idInput);
    await frame.type(pwSelector, pwInput);
    page.keyboard.press("Enter");
    await log.addLog("로그인 성공");
  
    // await page.waitForSelector("#DivMainPopup");
    await page.waitForSelector("#contents");
  
    // save cookie
    let cookies = await page.cookies();
  
    // load cookie
    await page.setCookie(...cookies);
  
    // consert
    let gameUrl =
      "https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB003";
    await page.goto(gameUrl);
  
    // if exsited popup -> close
    const popupCloseBut1 =
      "#div_checkDontsee_PT002_4_1 > div.popupInput > button.btn.btnClose";
    const closeButElement1 = await page.$(popupCloseBut1);
    if (closeButElement1 != null) {
      await page.click(popupCloseBut1);
    }

    // const popupCloseBut2 =
    //   "#div_checkDontsee_PT002_5_2 > div.popupInput > button.btn.btnClose";
    // const closeButElement2 = await page.$(popupCloseBut2);
    // if (closeButElement2 != null) {
    //   await page.click(popupCloseBut2);
    // }

    /**
     * 
    //   예매 오픈 시간까지 기다리기
    let startTime = new Date(2024, 8, 3, 11, 29, 59);
    let now = new Date();
    const diff = startTime.getTime() - now.getTime();
    await log.addLog("시작 대기 : " + diff / 1000.0 + "seconds");
    await new Promise((r) => setTimeout(r, diff));
    page.reload();
    
    await log.addLog("시간 완료!");
    
    */
  
    // const ticketSelector = ".stickyWrap";
    // await page.waitForSelector(ticketSelector);
  
    //   // 날짜
    //   let mutedDayLength = (await page.$$(".muted")).length;
    //   let dayCalculate = mutedDayLength + Number(day);
  
    //   const daySelector =
    //     "#productSide > div > div.sideMain > div.sideContainer.containerTop.sideToggleWrap > div.sideContent.toggleCalendar > div > div > div > div > ul:nth-child(3) > li:nth-child(" +
    //     `${dayCalculate}` +
    //     ")";
    //   await page.waitForSelector(daySelector);
    //   page.click(daySelector);
    //   await log.addLog("공연 관람일 클릭");
  
    // 예매하기
    // TODO : 티켓 오픈 예정 시간 입력 받아서 처리하는 로직
    // let startTime = new Date(2023, 3, 28, 11, 59, 59);
    // let now = new Date();
    // await new Promise(r => setTimeout(r, startTime.getTime() - now.getTime()));
    // await log.addLog("end wait");
  
    const buttonSelector =
      "div.timeScheduleList > div.timeSchedule.lineColor_Y > div.btns   > a.BtnColor_Y.btn1";
    await page.click(buttonSelector);
    const newPagePromise = await new Promise((x) => page.once("popup", x));
    await log.addLog("예매하기 버튼 클릭 성공");
    await page.setViewport({ width: 1080, height: 1600 });
    page = await newPagePromise;

    // const seatButton = await page.$(".groundList > div.list>a[sgn=3루 2층 테이블석(원정팀)]")
    // const seatButton = await page.evaluate('document.querySelector(".groundList > div.list>a[sgn=3루 2층 테이블석(원정팀)]")')
    // await log.addErrorLog(seatButton)
    // await page.click(seatButton)
  
  
    // 새창
    await page.waitForSelector("#divBookSeat");
    let iframeWindow = await page.$('iframe[id="ifrmSeat"]');
  
    frame = await iframeWindow.contentFrame();
    const seat = await  frame.$$('a[sgn=3루 2층 테이블석(원정팀)]")')
    await log.addLog(seat)
alert(JSON.stringify(seat))
    // // 잠깐 접어두기 클릭
    // await Promise.all([
    //   await frame.waitForSelector("#divCaptchaFolding > a"),
    //   await frame.click("#divCaptchaFolding > a"),
    // ]);
  
    return
  
    // 직접 구역 누르고
    // GetBlockSeatList('', '', '016');
    // #TmgsTable > tbody > tr > td > map > area:nth-child(16)
  
    // #divSeatBox 나오면 자동으로 좌석 클릭
    // await datailFrame.waitForSelector("#divSeatBox");
    // const seatArr = await datailFrame.$$('span[class="SeatN"]');
  
    // for (let index = 0; index < numberPerson; index++) {
    //   if (index + 1 > seatArr.length) {
    //     log.addErrorLog(
    //       "잔여좌석 " +
    //         seatArr.length +
    //         "개로 " +
    //         numberPerson -
    //         seatArr.length +
    //         "개의 좌석은 잡지 못했습니다."
    //     );
    //     break;
    //   }
    //   await seatArr[index].click();
    //   await log.addLog("select seat");
    // }
  
    // 좌석 선택 완료 버튼 클릭
    await frame.click(
      "body > form:nth-child(2) > div > div.contWrap > div.seatR > div > div.btnWrap > a"
    );
    await log.addLog("좌석 선택 완료");
  
    sleep(50000);
  
    // 사용자가 수기로 문자열 입력
  
    // await Promise.all([
    //     frame.click(arr[0]),
    //     frame.click(arr[1])
    // ]);
  
    // frame.click(area의 title이 036영역);
  
    // 완료
  
    // 문자열 입력 -> 결제 알아서 완료하기
    // const imgId = '#imgCaptcha';
    // await frame.waitForSelector(imgId);
    // let imgUrl = await frame.$eval(imgId, el => el.getAttribute('src'));
  
    // const worker = await createWorker();
    // (async () => {
    //     await worker.loadLanguage('eng');
    //     await worker.initialize('eng');
    //     const { data: { text } } = await worker.recognize(imgUrl);
    //     console.log('OCR :' + text);
    //     await worker.terminate();
    //   })();
    return true;
  }
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}