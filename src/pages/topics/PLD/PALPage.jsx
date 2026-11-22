import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function PALPage() {
  return (
    <StubTopicPage
      title="PAL – Programmable Array Logic"
      description="Only the AND plane is programmable; OR plane is fixed in PAL."
      parentPath="/topics/pld"
      parentTitle="PLD"
      subtopics={[]}
    />
  );
}
