import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function NOTPage() {
  return (
    <StubTopicPage
      title="NOT Gate"
      description="Inverts the input. Boolean: Y = A'."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
