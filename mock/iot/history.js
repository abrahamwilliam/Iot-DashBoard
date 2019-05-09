const demoTemperature = [];
const timechartTemp = [];
const tempFakeY = [24,28,30,27,24,22,19,15,14,12,11,10];

for (let i = 0; i < tempFakeY.length; i += 1) {
  const beginDay = new Date();
  beginDay.setTime(beginDay.getTime() + 1000 * 60 * 30 * i);
  demoTemperature.push({
    // eslint-disable-next-line new-cap
    x: beginDay.toTimeString().split(' ')[0],
    y: tempFakeY[i],
  });
  timechartTemp.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: tempFakeY[i],
  });
}

const roomData = [];
for (let i = 0; i < 6; i += 1) {
  roomData.push({name: `Room${  i + 1}`, costRate: Math.random(0, 1).toFixed(2)})
}

const costData = [
  {
    x: '电费',
    y: 232,
  },
  {
    x: '水费',
    y: 165,
  },
];

const getFakeChartData = {
  demoTemperature,
  timechartTemp,
  roomData,
  costData,
}




export default {
  'GET /api/fake_history_data': getFakeChartData,
}
