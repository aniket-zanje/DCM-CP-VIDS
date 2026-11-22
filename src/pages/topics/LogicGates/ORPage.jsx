import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function ORPage() {
  return (
    <StubTopicPage
      title="OR Gate"
      description="Output is HIGH when ANY input is HIGH. Boolean: Y = A + B."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
