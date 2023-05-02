/** Dweet POST functions **/

let individualGUID = "b73009ec-1002-4de7-9aae-c6eb718223a6"; // send individual's data
// get latest takes last 5 cached data
let groupGUID = "c7d93132-9150-48ae-a239-df99f54e6a49"; // send to community data

function sendData(colorData) {
  if (!ppg.bpm || ppg.bpm < 35) return; // muse is not currently active/worn
  let hueValue = {'hue1':colorData[0],'hue2':colorData[1]};
  let url = `https://dweet.io/dweet/for/${individualGUID}?${JSON.stringify(hueValue)}`;
  loadJSON(url);
  return hueValue;
}

function sendGroupData(data) {
  let url = `https://dweet.io/dweet/for/${individualGUID}?${JSON.stringify(data)}`;
  loadJSON(url);
}