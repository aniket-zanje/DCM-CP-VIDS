import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function NORPage() {
  return (
    <StubTopicPage
      title="NOR Gate"
      description="Universal gate — NOT of OR. Boolean: Y = (A + B)'."
      parentPath="/topics/logic-gates"
      parentTitle="Logic Gates"
      subtopics={[]}
    />
  );
}
