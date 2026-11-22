import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function ANDPage() {
  return (
    <StubTopicPage
      title="AND Gate"
      description="Output is HIGH only when ALL inputs are HIGH. Boolean: Y = A · B."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
