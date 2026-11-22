import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function XNORPage() {
  return (
    <StubTopicPage
      title="XNOR Gate"
      description="Output HIGH when inputs are same. Boolean: Y = (A ⊕ B)'."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
