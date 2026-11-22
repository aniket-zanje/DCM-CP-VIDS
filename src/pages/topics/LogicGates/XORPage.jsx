import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function XORPage() {
  return (
    <StubTopicPage
      title="XOR Gate"
      description="Output HIGH when inputs are different. Boolean: Y = A ⊕ B."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
