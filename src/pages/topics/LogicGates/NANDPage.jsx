import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function NANDPage() {
  return (
    <StubTopicPage
      title="NAND Gate"
      description="Universal gate — NOT of AND. Boolean: Y = (A · B)'."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
