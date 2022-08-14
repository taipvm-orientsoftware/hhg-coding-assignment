import { ReportHandler } from 'web-vitals';

interface WebVitalsProps {
  getCLS: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
  getFCP: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
  getFID: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
  getLCP: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
  getTTFB: (onReport: ReportHandler) => void;
}

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }: WebVitalsProps) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
