export function generateSapPrinterTxt(excelData, systemConfig, techId) {
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const changeTimestamp = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().replace(/[-:T.Z]/g, '').slice(0, 14); // 1 year earlier for CHGTSTMP

  const systemId = systemConfig.systemId || 'US4';
  const release = systemConfig.release || '758';
  const spoolServer = systemConfig.spoolServer || 'vhdiius4ci_US4_00';

  const generatedFiles = [];

  excelData.forEach((row, index) => {
    if (index === 0) return; // Skip header

    const filename = `${row['SAP Long Name']}.txt`.replace(/[^a-zA-Z0-9-]/g, '');
    const content = `VERSION = "0.1"
