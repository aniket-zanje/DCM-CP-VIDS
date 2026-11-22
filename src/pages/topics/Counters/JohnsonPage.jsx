import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function JohnsonPage() {
  return (
    <StubTopicPage
      title="Johnson Counter"
      description="Twisted ring counter where the complement of output feeds back to input."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
