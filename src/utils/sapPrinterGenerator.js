// src/utils/sapPrinterGenerator.js
export function generateSapPrinterTxt(excelData, systemConfig, techId) {
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const changeTimestamp = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:T.Z]/g, '')
    .slice(0, 14);

  const systemId = systemConfig.systemId || 'US4';
  const release = systemConfig.release || '758';
  const spoolServer = systemConfig.spoolServer || 'vhdiius4ci_US4_00';

  const generatedFiles = [];

  excelData.forEach((row, index) => {
    if (index === 0) return; // skip header

    const longName = row['SAP Long Name'] || '';
    const filename = `${longName}.txt`.replace(/[^a-zA-Z0-9-]/g, '_');

    const content =
`VERSION = "0.1"
TIME = "${timestamp}"
SYSTEM = "${systemId}"
RELEASE = "${release}"
* DEVICE = {
  NAME = "${longName}"
  PADEST = "${row['SAP Short Name'] || ''}"
  PATYPE = "SAPWIN5"
  PAMODEL = "${row['Manufacturer'] || ''} ${row['Model'] || ''}"
  PACLASS = ""
  PAARCHIVER = ""
  PALANGU = ""
  PADISABLED = "X"
  PANOQUERY = "X"
  PADUPCOPY = ""
  PADUPLEX = ""
  PASTORELOC = ""
  PADFLTUTTL = ""
  PADFLTSTTL = ""
  PASYNC = ""
  PAMONI = ""
  PASTANDORT = "${(row['Location'] || '').toUpperCase()}"
  PAMSG = "${(row['Location'] || '').toUpperCase()}"
  PAMSSERVER = "${spoolServer}"
  PAMETHOD = "S"
  PAPROSNAME = "${row['Windows Printer Name'] || ''}"
  PALOMS = ""
  PALPRCMD = ""
  PALPDHOST = "${row['Print Server Name'] || ''}"
  PALPDPORT = "0"
  PACONNTIME = "0"
  PAREADTIME = "0"
  PATRAYS = "0"
  PAXSHIFT = "0"
  PAYSHIFT = "0"
  PAXSHUNIT = "MM"
  PAYSHUNIT = "MM"
  PACRYPTMOD = ""
  PACRYPTMET = ""
  PANOVSERVR = ""
  PAPOOLART = "P"
  PATRACE2 = ""
  PATRACEF = ""
  PAPROTDATA = ""
  PAPROTCMD = ""
  PAPROTRES = ""
  PAKEEPFILE = ""
  CHGNAME1 = "${techId || row['Name of Tech'] || ''}"
  CHGTSTMP1 = "${changeTimestamp}"
  CHGSAPREL1 = "${release}"
  CHGSAPSYS1 = "${systemId}"
  PADEVGRP = ""
  COLORPRT = ""
  PRINTMODE = ""
  INPUTTRAY = ""
  PANOCHOICE = ""
}
`;

    generatedFiles.push({
      filename,
      content,
      blob: new Blob([content.trim()], { type: 'text/plain' })
    });
  });

  return generatedFiles;
}
