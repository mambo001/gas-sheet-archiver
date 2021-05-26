const MAIN_DUMP = SpreadsheetApp.openById("12OdxpPwNiu_XJOSuRqk_QJpYFOgEfN9EEuxYPfQWDmI");
const SID_AR_TAB = MAIN_DUMP.getSheetByName("SID-AR-tab");
const QM_PRIO_TAB = MAIN_DUMP.getSheetByName("QM - Prio");
const SPR_AR_TAB = MAIN_DUMP.getSheetByName("SPR-AR");


function getDailyValues() {
  const MTD_DTD = QM_PRIO_TAB.getRange("B2:C").getValues();
  const MTD = MTD_DTD.map(([e,]) => e)
  const DTD = MTD_DTD.map(([,e]) => e)

  return {
    MTD,
    DTD
  }
}

function addDTDToMTD(DTD,MTD) {
  const Range_MTD = QM_PRIO_TAB.getRange("B2:B");

  const countedArray = MTD
    .map((count, i) => {
      return count = count + DTD[i]
    })
    .map(c => [c])

  // console.log({countedArray})

  Range_MTD.setValues(countedArray)
  return Range_MTD.getValues()
}

function doClearDTD() {
  return QM_PRIO_TAB.getRange("C2:C").clearContent()
}

function doArchiveCounts() {
  const { MTD, DTD } = getDailyValues();
  const finalCountArray = addDTDToMTD(DTD, MTD);
  const isModified = JSON.stringify(MTD) !== JSON.stringify(finalCountArray.flat())
  
  isModified ? doClearDTD() : console.log('Column uncleared! Content is the same.')

  // console.log(isTheSame)
  // console.log(JSON.stringify(MTD))
  // console.log(JSON.stringify(finalCountArray.flat()))
}