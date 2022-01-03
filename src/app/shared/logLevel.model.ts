export class LogLevel {
  None = 0;
  Info = 1;
  Verbose = 2;
  Warn = 3;
  Error = 4;

  constructor() { }
}

async convertData(fromDate: string, toDate: string, dataCenter: string): Promise<void> {
    this.logger.warn('converting data to export');
    this.SpinnerService.show();
    const exportData = await this.siService.getExportData(dataCenter, fromDate, toDate, 'ACTIVE');
    for (const exp of exportData) {
      const jiraExport = new JiraExport();
      jiraExport.assetId = exp[0];
      jiraExport.userCount = exp[1];
      jiraExport.userTypeCode = exp[2];
      jiraExport.userType = exp[3];
      jiraExport.assetName = exp[4];
      jiraExport.url = exp[5];
      jiraExport.pod = exp[6];
      jiraExport.engagementId = exp[8];
      jiraExport.projectKey = jiraExport.url === null ? '' : jiraExport.url.substr(jiraExport.url.lastIndexOf('/') + 1);
      this.jiraExports.push(jiraExport);
    }
    this.logger.info('data exported');
    this.excelService.exportAsExcelFile(this.jiraExports, 'JIRA');
    this.SpinnerService.hide();
  }
