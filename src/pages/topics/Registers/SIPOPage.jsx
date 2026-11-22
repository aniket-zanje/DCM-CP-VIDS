import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function SIPOPage() {
  return (
    <StubTopicPage
      title="SIPO – Serial In Parallel Out Register"
      description="Data enters serially and all bits are available simultaneously at outputs."
      parentPath="/topics/registers"
      parentTitle="Registers"
      subtopics={[]}
    />
  );
}
