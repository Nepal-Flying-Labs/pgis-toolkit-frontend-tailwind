import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const PreviewDocument = () => {
  const [isCsv, setIsCsv] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);
  const document = useSelector(
    state => state.projectDashboard.selectedDocument,
  );

  useEffect(() => {
    if (!isCsv || !document) return;

    const getBlobFromUrl = async () => {
      const blob = await fetch(document.file).then(r => r.blob());
      const binaryData = [];
      binaryData.push(blob);
      setBlobUrl(
        window.URL.createObjectURL(new Blob(binaryData, { type: 'text/csv' })),
      );
    };

    getBlobFromUrl();
  }, [document, isCsv]);

  if (!isCsv) {
    const fileUrlArray = document?.file?.split('/');
    const fileName = fileUrlArray[fileUrlArray.length - 1];

    if (fileName?.includes('csv')) {
      setIsCsv(true);
    }
  }

  const docs = [{ uri: isCsv ? blobUrl : document.file }];
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  return (
    <div
      className="naxatw-w-full naxatw-overflow-x-hidden"
      style={{
        height: `calc(100vh - ${projectHeaderHeight}px)`,
      }}
    >
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: { disableHeader: true },
          disableBuiltInPlugins: true,
        }}
      />
    </div>
  );
};

export default PreviewDocument;
