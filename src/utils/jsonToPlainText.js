export default function jsonToPlainText(jsonData) {
  let plainText = '';

  const jobData = jsonData?.jobAreas
    .map(item => {
      const regular = item.sheets
        .filter(sheet => sheet.sheetType === 'Regular')
        .map(
          filteredSheet =>
            `${filteredSheet.sheetTitle} | ${filteredSheet.quantity}`,
        )
        .join('\n');

      const fiftyFourInch = item.sheets
        .filter(sheet => sheet.sheetType === '54 Inch')
        .map(
          filteredSheet =>
            `${filteredSheet.sheetTitle} | ${filteredSheet.quantity}`,
        )
        .join('\n');

      const other = item.sheets
        .filter(sheet => sheet.sheetType === 'Other')
        .map(
          filteredSheet =>
            `${filteredSheet.sheetTitle} | ${filteredSheet.quantity}`,
        )
        .join('\n');

      const supplier = item.supplies

        .map(supplySheet => `${supplySheet.title} | ${supplySheet.quantity}`)
        .join('\n');

      return `${item.jobAreaName} | ${
        item.squareFeet
      } sq ft \n\nSheet thickness: ${item.sheetThickness}\n\n${
        regular.length > 0 ? `Drywall Sheets \n${regular}\n` : ''
      }\n\n${
        fiftyFourInch.length > 0 ? `54 Inch Sheets \n${fiftyFourInch}\n` : ''
      }\n\n ${other.length > 0 ? `Other Sheets \n${other}\n` : ''} \n\n ${
        supplier.length > 0
          ? `Other Supplies (specific to this area) \n ${supplier}\n`
          : ''
      } `;
    })
    .join('\n');

  plainText = `Job Name: ${jsonData?.jobName}  |  ${
    jsonData.squareFeet
  } sq ft \n\nDate: ${jsonData?.date}\n${
    jsonData?.contractorName !== null
      ? `Contractor Name: ${jsonData?.contractorName}`
      : ''
  }\n${jsonData?.location !== null ? `Location: ${jsonData?.location}` : ''}\n${
    jsonData?.lotNumberOrSubDivision !== null
      ? `Lot Number/Subdivision: ${jsonData?.lotNumberOrSubDivision}`
      : ''
  }
  \n${jobData},
  ${jsonData?.notes}
  `;
  return plainText;
}
