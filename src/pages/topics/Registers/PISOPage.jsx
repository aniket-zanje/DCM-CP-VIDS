import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function PISOPage() {
  return (
    <StubTopicPage
      title="PISO – Parallel In Serial Out Register"
      description="All bits are loaded simultaneously and shifted out serially."
      parentPath="/topics/registers"
      parentTitle="Registers"
      subtopics={[]}
    />
  );
}
