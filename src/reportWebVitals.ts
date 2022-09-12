import { ReportHandler } from 'web-vitals';

// eslint-disable-next-line consistent-return
const reportWebVitals = (onPerfEntry?: ReportHandler): Promise<void> | undefined => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    return import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
