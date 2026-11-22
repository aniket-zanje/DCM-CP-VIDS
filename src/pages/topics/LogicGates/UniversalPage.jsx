import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function UniversalPage() {
  return (
    <StubTopicPage
      title="Universal Gates (NAND & NOR)"
      description="Any Boolean function can be implemented using only NAND or NOR gates."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
