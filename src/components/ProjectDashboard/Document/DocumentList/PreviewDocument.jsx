import React from 'react';
import { useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const PreviewDocument = () => {
  const document = useSelector(state => state.projectDashboard.document.item);
  const docs = [{ uri: document.file }];
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
